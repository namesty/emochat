import React, { useState } from 'react'
import { AuthService } from '../../../features/auth/domain/auth-service';
import { faChartPie, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './toolbar.module.css'
import { ConversationCreateModal } from '../../../features/conversation/ui/create/conversationCreateModal';
import { useHistory } from 'react-router-dom';
import { Conversation } from '../../../features/conversation/domain/conversation';
import { Icon } from '../../../core/components/icon/icon';

interface Props {
  authService: AuthService
  createNewConversation?: (newConversation: Conversation) => void
}

export const Toolbar: React.FC<Props> = ({ authService, createNewConversation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const history = useHistory()

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

  return (
    <div className={styles.header}>
      <Icon 
        icon={faSignOutAlt} 
        onPress={() => {
          authService.logout()
          history.push('/login')
        }}
      />

      <Icon icon={faChartPie}/>

      { createNewConversation && 
        <>
          <Icon icon={faPlus} onPress={onModalOpen}/>

          <ConversationCreateModal
            onCreateConversation={onCreateConversation}
            isOpen={modalVisible}
            onClose={onModalClose}
          />
        </>
      }
    </div>
  )
}