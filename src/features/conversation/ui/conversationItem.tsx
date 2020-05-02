import React from 'react'
import { Conversation } from '../domain/conversation'
import { ListItem } from '../../../core/components/listItem'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  conversation: Conversation
  meId: string
}

export const ConversationItem: React.FC<Props> = ({ conversation: convo, meId, ...rest }) => {

  const notMeUsers = convo.users.filter(u => u.id !== meId)
  const lastMessage = convo.messages.length > 0 && convo.messages.slice(-1)[0];

  return (
    <ListItem 
      key={convo.id}
      bigText={`${notMeUsers[0].name} ${notMeUsers[0].lastName}`}
      smallText={lastMessage? lastMessage.content.substring(0, 10) : ''}
      {...rest}
    />
  )
}