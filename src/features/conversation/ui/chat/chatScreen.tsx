import React, { useState, useEffect, useRef } from "react";
import lodash from "lodash";
import styles from "./chatScreen.module.css";
import { SheetLayout } from "../../../../application/ui/sheetLayout/sheetLayout";
import { Conversation } from "../../domain/conversation";
import { Gradient } from "../../../emotion/domain/gradient";
import { EmotionService } from "../../../emotion/domain/emotion-service";
import { NewMessageData } from "../../../message/domain/message";
import { ConversationRepositoryFactory } from "../../infrastructure/conversation-repository-factory";
import { EmotionRepositoryFactory } from "../../../emotion/infrastructure/emotion-repository-factory";
import { NewMessageParams } from "../../../message/domain/messageParams";
import { User } from "../../../user/domain/user";
import { Toolbar } from "../toolbar/toolbar";
import { ConversationList } from "../list/conversationList";
import { Header } from "../../../../application/ui/header/header";
import { MessageList } from "../../../message/ui/messageList";
import { MessageInput } from "../../../message/ui/input/messageInput";
import { AuthServiceFactory } from "../../../auth/infrastructure/auth-service-factory";
import { Auth } from "../../../auth/domain/auth";
import { CustomLoader } from "../../../../core/components/loader/loader";
import { toast } from "react-toastify";
import { startSocketClient } from "../../../message/infrastructure/sockets";

export const ChatScreen: React.FC = () => {
  const [messageText, setMessageText] = useState("");
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [gradients, setGradients] = useState<Gradient[]>();
  const [currentConvo, setCurrentConvo] = useState<Conversation>(
    conversations[0]
  );
  const [online, setOnline] = useState(false)
  const [loadingConversations, setLoadingConversations] = useState(false)
  const [loadingEmotions, setLoadingEmotions] = useState(false)
  const conversationsRef = useRef(conversations);
  const authService = AuthServiceFactory.build()
  const authData = authService.getFromStorage() as Auth
  const emotionService = new EmotionService();
  const isGroup = currentConvo && currentConvo.users.length > 2;

  useEffect(() => {
    conversationsRef.current = conversations;
  });

  useEffect(() => {
    if (currentConvo) {
      const latestGradients = emotionService.getLatestUserGroupGradients(
        currentConvo.emotions,
        currentConvo.users
      );

      if (!lodash.isEqual(gradients, latestGradients)) {
        setGradients(latestGradients);
      }
    }
  });

  useEffect(() => {
      fetchConversations();

      if(!process.env.REACT_APP_API_URL) {
        throw new Error('API URL must be set in .env file')
      }

      const socket = startSocketClient({
        wsURL: process.env.REACT_APP_API_URL,
        token: authData.token,
        onConnect: () => {
          setOnline(true)
        },
        onDisconnect: (reason: string) => {
          toast.error('You have been disconnected from chat service')
          setOnline(false)
  
          if (reason === 'io server disconnect') {
            socket.connect();
          }
        },
        onNewMessage: (newMessage: NewMessageData) => {
          if(typeof newMessage === 'string') {
            newMessage = JSON.parse(newMessage)
          }
  
          addMessageToConvo(newMessage, conversationsRef.current)
        }
      })

      setSocket(socket);

      return () => {
        socket.close();
      };
  }, []);

  const conversationRepository = ConversationRepositoryFactory.build();
  const emotionRepository = EmotionRepositoryFactory.build();

  const addMessageToConvo = (
    newMessage: NewMessageData,
    conversationsRef: Conversation[],
  ) => {

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

  const getNonGroupLatestGradient = () => {
    if (!gradients) return "";

    const gradient = gradients.find((g) => {
      return g.user.email !== authData?.user.email;
    });

    if (!gradient) return "";

    return gradient.gradient;
  };

  const analyzeMessages = async () => {
    setLoadingEmotions(true)
    const emotions = await emotionRepository.analyzeLastNMessages(
      5,
      currentConvo.id
    );

    const gradientStrings = emotionService.getLatestUserGroupGradients(
      emotions,
      currentConvo.users
    );

    setCurrentConvo({
      ...currentConvo,
      emotions: [...currentConvo.emotions, ...emotions]
    })
    setLoadingEmotions(false)
    setGradients(gradientStrings);
  };

  const onChangeInput = (event: any) => setMessageText(event.target.value);

  async function fetchConversations() {
    setLoadingConversations(true)
    const conversations = await conversationRepository.findMyConversations();
    setLoadingConversations(false)
    setConversations(conversations);
    setCurrentConvo(conversations[0]);
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

    if (socket && online) {
      socket.emit("newMessage", newMessage);
      setMessageText('')
    } else {
      toast.error('You are offline')
    }
  };

  const filterUsers = (users: User[]): string => {
    const result = users
      .filter((u) => u.id !== authData.user.id)
      .map((u) => `${u.name} ${u.lastName}`);
    return result.reduce((prev, current, i) => {
      const name = prev + current;
      return result[i + 1] ? name + ", " : name;
    }, "");
  };

  const onCreateNewConversation = (newConversation: Conversation) => {
    setConversations([...conversations, newConversation]);
    setCurrentConvo(newConversation);
  };

  const deleteConversation = async (conversationId: string) => {
    await conversationRepository.deleteConversation(conversationId);

    const remainingConversations = conversations.filter(
      (c) => c.id !== conversationId
    );
    if (currentConvo.id === conversationId) {
      setCurrentConvo(remainingConversations[0]);
    }

    setConversations(remainingConversations);
  };

  return (
    <SheetLayout>
      <div className={styles.conversationsContainer}>
        <Toolbar
          createNewConversation={onCreateNewConversation}
          conversations={conversations}
          selectCurrentConversation={selectConversation}
        />
        { loadingConversations? 
          <CustomLoader text="Fetching conversations..."/>:
          <ConversationList
            authData={authData}
            conversations={conversations}
            selectConversation={selectConversation}
            deleteConversation={deleteConversation}
          />
        }
      </div>
      <div className={styles.chatScreen}>
        <Header
          text={currentConvo && filterUsers(currentConvo.users)}
          gradient={getNonGroupLatestGradient()}
        />
        {currentConvo && (
          <>
            <div className={styles.chatBody}>
              <div className={styles.messagesContainer}>
                <MessageList
                  isGroup={isGroup}
                  conversation={currentConvo}
                  authData={authData}
                  gradients={gradients || []}
                />
              </div>
            </div>
            <div className={styles.chatInputContainer}>
              <MessageInput
                onChange={onChangeInput}
                value={messageText}
                onClickSend={sendMessage}
                onClickEmotion={analyzeMessages}
                loadingEmotion={loadingEmotions}
                online={online}
              />
            </div>
          </>
        )}
      </div>
    </SheetLayout>
  );
};
