import React, { useState } from 'react'
import Modal, { Props as ModalProps } from 'react-modal'
import { UserList } from '../../../user/ui/userList'
import { ConversationRepositoryFactory } from '../../infrastructure/conversation-repository-factory'
import { User } from '../../../user/domain/user'
import { Conversation } from '../../domain/conversation'
import styles from './conversationCreateModal.module.css'
import { Header } from '../../../../application/ui/header/header'
import { CustomLoader } from '../../../../core/components/loader/loader'

interface Props extends ModalProps {
  onClose: () => void
  onCreateConversation: (newConversation: Conversation) => void,
  setCurrentConversation: (conversation: Conversation) => void,
  conversations: Conversation[]
}

const defaultStyle = {
  content: {
    width: '65%',
    height: '85%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden'
  }
}

export const ConversationCreateModal: React.FC<Props> = ({
  onCreateConversation,
  onClose,
  setCurrentConversation,
  conversations,
  style,
  ...rest
}) => {

  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const conversationRepository = ConversationRepositoryFactory.build()

  const createConversation = async () => {
    setLoading(true)
    const newConversation = await conversationRepository.createConversation(selectedUsers.map(u => u.id))
    setLoading(false)

    const alreadyExisting = conversations.find(c => c.id === newConversation.id)

    if(alreadyExisting) {
      setCurrentConversation(alreadyExisting)
    } else {
      onCreateConversation(newConversation)
    }
  }

  return (
    <Modal
      onRequestClose={onClose}
      style={style || defaultStyle}
      {...rest}
    >
      <div className={styles.headerContainer}>
        <Header 
          text="Select one or more users to start a conversation with"
        />
      </div>
      <div className={styles.userList} data-testid={'modal-list'}>
        <UserList
          setSelectedUsersCallback={setSelectedUsers}
        />
      </div>

      {
        selectedUsers.length > 0 && !loading &&
        <div className={styles.buttonContainer}>
          <button
            className={styles.createButton}
            disabled={!setSelectedUsers}
            onClick={createConversation}
          >
            Create conversation
          </button>
        </div>
      }
      {
        loading && <CustomLoader text={'Creating conversation...'}/>
      }
    </Modal>
  )
}