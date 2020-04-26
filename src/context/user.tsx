import React, { createContext, useState } from 'react'
import { User } from '../User'

export const UserContext = createContext<any>([])

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<User[]>([])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}