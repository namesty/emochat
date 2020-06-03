import React from 'react'
import { Conversation } from '../../conversation/domain/conversation'
import { Auth } from '../../auth/domain/auth'
import { MessageBubble } from './bubble/messageBubble'
import { Gradient } from '../../emotion/domain/gradient'

interface Props {
  conversation: Conversation
  authData: Auth
  isGroup: boolean,
  gradients: Gradient[]
}

const possibleColors = [
  '#e54f85',
  '#f9a17f',
  '#f4c453',
  '#6ab861',
  '#44a582'
]

export const MessageList: React.FC<Props> = ({conversation, authData, isGroup, gradients}) => {

  const colorMap = Object.fromEntries(conversation.users.map((u, i) => {
    const randomNum = Math.ceil(Math.random() * possibleColors.length - 1)
    return [u.email, possibleColors[randomNum]]
  }))

  return (
    <div>
      {
        conversation.messages.map((message, i) => {

          const gradient = gradients.find(g => g.user.email === message.from.email)

          return (
            <MessageBubble
              isGroup={isGroup}
              key={i}
              colorUserMap={colorMap}
              message={message}
              mine={message.from.id === authData.user.id}
              gradient={gradient}
            />
          )
        })
      }
    </div>
  )
}