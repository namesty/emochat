import React, { useState, useEffect } from 'react'
import { Conversation } from '../domain/conversation'
import { ConversationRepositoryFactory } from '../infrastructure/conversation-repository-factory'
import { ConversationItem } from './conversationItem'
import { AuthService } from '../../auth/domain/auth-service'
import { Auth } from '../../auth/domain/auth'

interface Props {
  authData: Auth
  conversations: Conversation[]
  selectConversation: (convo: Conversation) => void
}

export const ConversationList: React.FC<Props> = ({conversations, authData, selectConversation}) => {
  return (
    <div>
      { authData && conversations.map( convo => {
        return (
          <ConversationItem
            key={convo.id}
            conversation={convo}
            meId={authData.user.id}
            onClick={() => selectConversation(convo)}
          />)
      })}
    </div>
  )
}