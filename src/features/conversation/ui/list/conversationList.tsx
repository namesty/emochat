import React from 'react'
import { Conversation } from '../../domain/conversation'
import { Auth } from '../../../auth/domain/auth'
import { ConversationItem } from './conversationItem'

interface Props {
  authData: Auth
  conversations: Conversation[]
  selectConversation: (convo: Conversation) => void
  deleteConversation: (conversationId: string) => void
}

export const ConversationList: React.FC<Props> = ({conversations, authData, selectConversation, deleteConversation}) => {
  return (
    <div>
      { authData && conversations.map( convo => {
        return (
          <ConversationItem
            key={convo.id}
            conversation={convo}
            meId={authData.user.id}
            onClick={() => selectConversation(convo)}
            deleteConversation={deleteConversation}
          />)
      })}
    </div>
  )
}