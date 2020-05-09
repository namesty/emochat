import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styles from "./conversationScreen.module.css";
import { ConversationList } from "../conversations/conversationList";
import { Conversation } from "../../domain/conversation";
import { ConversationRepositoryFactory } from "../../infrastructure/conversation-repository-factory";
import { AuthService } from "../../../auth/domain/auth-service";
import { MessageList } from "../../../message/ui/messageList";
import { Message } from "../../../../Message";
import { useHistory } from "react-router-dom";
import { User } from "../../../user/domain/user";
import { Input } from "../../../../core/components/input/input";
import { Header } from "../header/conversationHeader";

interface NewMessage {
  conversationId: string;
  message: Message;
}

interface Props {
  authService: AuthService;
}

export const ConversationScreen: React.FC<Props> = ({ authService }) => {
  const [messageText, setMessageText] = useState("");
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
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

      socket.on("newMessage", (newMessage: NewMessage) =>
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

  const conversationRepository = ConversationRepositoryFactory.build();

  const addMessageToConvo = (
    newMessage: NewMessage,
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
    const message: Message = {
      from: authData.user,
      content: messageText,
      date: Date.now().toString(),
    };

    const newMessage: NewMessage = {
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
            <Input onChange={onChangeInput} value={messageText} onClickButton={sendMessage} />
          </div>
        </div>
      }
    </div>
  );
};
