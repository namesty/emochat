import React from 'react'
import { Conversation } from '../../domain/conversation';
import { ListItem } from '../../../../core/components/listItem';
import { faUser, faUsers, faTimes } from '@fortawesome/free-solid-svg-icons';
import { capitalize } from '../../../../utils/stringUtils';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  conversation: Conversation
  deleteConversation: (conversationId: string) => void
  meId: string
}

export const ConversationItem: React.FC<Props> = ({ conversation: convo, meId, deleteConversation, ...rest }) => {

  const notMeUsers = convo.users.filter(u => u.id !== meId)
  const lastMessage = convo.messages.length > 0 && convo.messages.slice(-1)[0];
  const isGroupChat = convo.users.length > 2

  const usersText = notMeUsers.reduce((prev, next, i) => {

    const firstName = capitalize(next.name)
    const lastName = capitalize(next.lastName)

    if(i === 0){
      return prev + `${firstName} ${lastName}`
    }

    if(notMeUsers[i+1]){
      return prev + `, ${firstName} ${lastName}`
    }
    
    return prev + ` and ${firstName} ${lastName}`

  }, '')

  return (
    <ListItem 
      key={convo.id}
      bigText={usersText}
      smallText={lastMessage? lastMessage.content.substring(0, 10) : ''}
      leftIcon={isGroupChat? {icon: faUsers}: {icon: faUser}}
      rightIcon={{
        icon: faTimes,
        onPress: () => deleteConversation(convo.id)
      }}
      {...rest}
    />
  )
}