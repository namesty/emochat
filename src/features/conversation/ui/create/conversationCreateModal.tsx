import React, { useState } from 'react'
import Modal, { Props as ModalProps } from 'react-modal'
import { UserList } from '../../../user/ui/userList'
import { ConversationRepositoryFactory } from '../../infrastructure/conversation-repository-factory'
import { User } from '../../../user/domain/user'
import { Conversation } from '../../domain/conversation'

interface Props extends ModalProps {
  onClose: () => void
  onCreateConversation: (newConversation: Conversation) => void
}

const defaultStyle = {
  content: {
    width: 500,
    height: 600,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export const ConversationCreateModal: React.FC<Props> = ({
  onCreateConversation,
  onClose,
  style,
  ...rest
}) => {

  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const conversationRepository = ConversationRepositoryFactory.build()

  const createConversation = async () => {
    const newConversation = await conversationRepository.createConversation(selectedUsers.map(u => u.id))
    onCreateConversation(newConversation)
  }

  return (
    <Modal
      onRequestClose={onClose}
      style={style || defaultStyle}
      {...rest}
    >
      <h2>Select one or more users to start a conversation with</h2>
      <UserList
        setSelectedUsersCallback={setSelectedUsers}
      />

      <button
        disabled={!setSelectedUsers}
        onClick={createConversation}
      >
        Create conversation
      </button>
    </Modal>
  )
}