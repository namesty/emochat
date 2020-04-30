import React, { useState, useEffect } from 'react'
import styles from './contacts.module.css'
import { UserRepositoryFactory } from '../../features/user/infrastructure/user-repository-factory'
import { User } from '../../features/user/domain/user'
import { ContactBox } from '../../core/components/contact'

export const Contacts: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  
  useEffect(() => {
    fetchUsers()
  }, [])

  const userRepository = UserRepositoryFactory.build()
  
  async function fetchUsers() {
    const users = await userRepository.findAll()
    setUsers(users)
  }

  return (
    <div>
      {users.map(user => {
        return <ContactBox key={user.id} user={user} />
      })}
    </div>
  )
}