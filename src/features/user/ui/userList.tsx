import React, { useState, useEffect } from 'react'
import { UserRepositoryFactory } from '../infrastructure/user-repository-factory'
import { User } from '../domain/user'
import { UserItem } from './user'
import { ConversationRepositoryFactory } from '../../conversation/infrastructure/conversation-repository-factory'
import { useHistory } from 'react-router-dom'

interface Props {
  setSelectedUsersCallback: (selectedUsers: User[]) => void
}

export const UserList: React.FC<Props> = ({ setSelectedUsersCallback }) => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const history = useHistory()
  
  useEffect(() => {
    fetchUsers()
  }, [])

  setSelectedUsersCallback(selectedUsers)

  const userRepository = UserRepositoryFactory.build()
  
  async function fetchUsers() {
    const users = await userRepository.findAll()
    setUsers(users)
  }

  const selectUser = (selectedUser: User, alreadySelected: boolean) => {

    if(!alreadySelected) {
      setSelectedUsers([...selectedUsers, selectedUser])
    } else {
      setSelectedUsers(selectedUsers.filter(u => u.email !== selectedUser.email))
    }
  }

  return (
    <div>
      <div>
        {users.map(user => {

          const alreadySelected = selectedUsers.some(u => u.email === user.email)

          return (
            <UserItem 
              key={user.id} 
              user={user} 
              style={{background: alreadySelected? 'gainsboro': 'white'}} 
              onClick={() => selectUser(user, alreadySelected)}
            />
          )
        })}
      </div>
    </div>

  )
}