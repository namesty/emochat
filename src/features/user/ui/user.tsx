import React from 'react'
import { ListItem } from '../../../core/components/listItem'
import { User } from '../domain/user'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: User
}

export const UserItem: React.FC<Props> = ({ user, ...rest }) => {

  return (
    <ListItem 
      key={user.id}
      bigText={`${user.name} ${user.lastName}`}
      smallText={user.email}
      {...rest}
    />
  )
}