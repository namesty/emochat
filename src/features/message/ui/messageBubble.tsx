import React from 'react'
import { Message } from '../../../Message'
import { TextBubble } from '../../../core/components/message/textBubble'
import { Auth } from '../../auth/domain/auth'

interface Props {
  message: Message
  mine: boolean
}

export const MessageBubble: React.FC<Props> = ({ message, mine }) => {

  return (
    <TextBubble
      mine={mine}
      time={message.date}
      content={message.content}
    />
  )
}