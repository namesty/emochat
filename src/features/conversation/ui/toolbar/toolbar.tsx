import React, { useState } from 'react'
import { faChartPie, faSignOutAlt, faPlus, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './toolbar.module.css'
import { ConversationCreateModal } from '../create/conversationCreateModal';
import { useHistory } from 'react-router-dom';
import { Conversation } from '../../domain/conversation';
import { Icon } from '../../../../core/components/icon/icon';
import { AuthServiceFactory } from '../../../auth/infrastructure/auth-service-factory';

interface Props {
  createNewConversation: (newConversation: Conversation) => void
  conversations: Conversation[]
  selectCurrentConversation: (conversation: Conversation) => void
}

export const Toolbar: React.FC<Props> = ({ 
  createNewConversation,
  selectCurrentConversation,
  conversations
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const history = useHistory()

  const authService = AuthServiceFactory.build()

  const onModalOpen = () => {
    setModalVisible(true)
  }

  const onModalClose = () => {
    setModalVisible(false)
  }

  const onCreateConversation = (newConversation: Conversation) => {
    if(createNewConversation) {
      createNewConversation(newConversation)
      onModalClose()
    }
  }

  const onSelectCurrentConversation = (conversation: Conversation) => {
    if(selectCurrentConversation) {
      selectCurrentConversation(conversation)
      onModalClose()
    }
  }

  return (
    <div className={styles.header}>
      <Icon 
        icon={faSignOutAlt} 
        onPress={() => {
          authService.logout()
          history.push('/login')
        }}
      />

      <Icon icon={faChartPie}
        onPress={() => history.push('/stats')}
      />

      <Icon icon={faPlus} onPress={onModalOpen} data-testid={'new-convo'}/>

      <ConversationCreateModal
        conversations={conversations}
        setCurrentConversation={onSelectCurrentConversation}
        onCreateConversation={onCreateConversation}
        isOpen={modalVisible}
        onClose={onModalClose}
      />
    </div>
  )
}