import React from 'react'
import { Conversation } from '../../conversation/domain/conversation'
import { Auth } from '../../auth/domain/auth'
import { MessageBubble } from './messageBubble'

interface Props {
  conversation: Conversation
  authData: Auth
}

export const MessageList: React.FC<Props> = ({conversation, authData}) => {

  return (
    <div>
      {
        conversation.messages.map((message, i) => {
          return (
            <MessageBubble
              key={i}
              message={message}
              mine={message.from.id === authData.user.id}
            />
          )
        })
      }
    </div>
  )
}