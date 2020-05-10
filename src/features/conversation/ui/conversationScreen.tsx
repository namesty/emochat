import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styles from "./conversationScreen.module.css";
import { ConversationList } from "./list/conversationList";
import { Conversation } from "../domain/conversation";
import { ConversationRepositoryFactory } from "../infrastructure/conversation-repository-factory";
import { AuthService } from "../../auth/domain/auth-service";
import { MessageList } from "../../message/ui/messageList";
import { useHistory } from "react-router-dom";
import { User } from "../../user/domain/user";
import { Header } from "./header/conversationHeader";
import { MessageInput } from "../../message/ui/input/messageInput";
import { EmotionRepositoryFactory } from "../../emotion/infrastructure/emotion-repository-factory";
import { Emotion } from "../../emotion/domain/emotion";
import { NewMessageData } from "../../message/domain/message";
import { NewMessageParams } from "../../message/domain/messageParams";

interface Props {
  authService: AuthService;
}

export const ConversationScreen: React.FC<Props> = ({ authService }) => {
  const [messageText, setMessageText] = useState("");
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [emotion, setEmotion] = useState<Emotion>()
  const [currentConvo, setCurrentConvo] = useState<Conversation>(
    conversations[0]
  );
  const conversationsRef = useRef(conversations);
  const history = useHistory();
  const authData = authService.getFromStorage();

  useEffect(() => {
    conversationsRef.current = conversations
  });

  //extraer sockets etc en otra clase. Colocarlo en el dominio de application

  useEffect(() => {
    if (authData) {
      fetchConversations();

      const socket = io("http://192.168.1.40:3500");
      socket.on("askForToken", () => {
        socket.emit("sendToken", authData.token);
      });

      socket.on("newMessage", (newMessage: NewMessageData) =>
        addMessageToConvo(newMessage, conversationsRef.current)
      );

      setSocket(socket);

      return () => {
        socket.close();
      };
    } else {
      history.push("/login");
    }
  }, []);

  const conversationRepository = ConversationRepositoryFactory.build()
  const emotionRepository = EmotionRepositoryFactory.build()

  const addMessageToConvo = (
    newMessage: NewMessageData,
    conversationsRef: Conversation[]
  ) => {
    console.log(newMessage, conversationsRef);

    const updatedConvos = conversationsRef.map((convo) => {
      if (convo.id !== newMessage.conversationId) {
        return convo;
      } else {
        convo.messages.push(newMessage.message);
        return convo;
      }
    });

    setConversations(updatedConvos);
  };

  const analyzeMessages = async () => {
    const messagesToAnalyze = currentConvo.messages.filter(m => {
      return m.from.email !== authData?.user.email
    })
    .slice(0, 10)

    emotionRepository.analyzeMessages(messagesToAnalyze)

    console.log(messagesToAnalyze)
  }

  if (!authData) {
    history.push("/login");
    return <></>;
  }

  const onChangeInput = (event: any) => setMessageText(event.target.value);

  async function fetchConversations() {
    const conversations = await conversationRepository.findMyConversations();
    setConversations(conversations);
    setCurrentConvo(conversations[0])
  }

  const selectConversation = (convo: Conversation) => {
    setCurrentConvo(convo);
  };

  const sendMessage = () => {
    const message = {
      from: authData.user,
      content: messageText,
      date: Date.now().toString(),
    };

    const newMessage: NewMessageParams = {
      conversationId: currentConvo.id,
      message,
    };

    if (socket) {
      socket.emit("newMessage", newMessage);
    }
  };

  const filterUsers = (users: User[]): string => {
    const result = users.filter( u => u.id !== authData.user.id).map(u => `${u.name} ${u.lastName}`)
    return result.reduce((prev, current, i) => {
      const name = prev + current
      return result[i + 1]? name + ', ': name
    }, '')
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.conversationsContainer}>
        <div className={styles.header}>
          <p>CONVERSATIONS</p>
        </div>
        {
          <ConversationList
            authData={authData}
            conversations={conversations}
            selectConversation={selectConversation}
          />
        }
      </div>
      {
        currentConvo && 
        <div className={styles.chatScreen}>
          <Header fullName={filterUsers(currentConvo.users)}/>
          <div className={styles.chatBody}>
            <MessageList conversation={currentConvo} authData={authData} />
          </div>
          <div className={styles.chatInputContainer}>
            <MessageInput onChange={onChangeInput} value={messageText} onClickSend={sendMessage} onClickEmotion={analyzeMessages}/>
          </div>
        </div>
      }
    </div>
  );
};
