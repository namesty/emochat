import React, { useState, useEffect } from 'react'
import { UserRepositoryFactory } from '../infrastructure/user-repository-factory'
import { User } from '../domain/user'
import { UserItem } from './user'
import { ConversationRepositoryFactory } from '../../conversation/infrastructure/conversation-repository-factory'
import { useHistory } from 'react-router-dom'

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const history = useHistory()
  
  useEffect(() => {
    fetchUsers()
  }, [])

  const userRepository = UserRepositoryFactory.build()
  const conversationRepository = ConversationRepositoryFactory.build()
  
  async function fetchUsers() {
    const users = await userRepository.findAll()
    setUsers(users)
  }

  const selectUser = (selectedUser: User) => {
    const alreadySelected = selectedUsers.find(u => u.id === selectedUser.id)

    if(!alreadySelected) {
      setSelectedUsers([...selectedUsers, selectedUser])
    }
  }

  const createConversation = async () => {
    await conversationRepository.createConversation(selectedUsers.map(u => u.id))
    history.push('/home')
  }

  return (
    <div>
      <div>
        {users.map(user => {
          return <UserItem key={user.id} user={user} onClick={() => selectUser(user)}/>
        })}
      </div>
      <button onClick={createConversation}>Confirm</button>
    </div>

  )
}