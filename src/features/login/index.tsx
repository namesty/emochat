import React, { useState, useContext } from 'react'
import { login } from '../../utils/auth'
import { UserContext } from '../../context/user'

export const Login: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useContext(UserContext)

  console.log(user)

  const onSubmit = async (event: any) => {
    event.preventDefault()
    const result = await login(email, password)
    setUser(result)
  }

  const onChangeEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event: any) => {
    setPassword(event.target.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='email'
        onChange={onChangeEmail}
      />
      <input
        type='password'
        name='password'
        onChange={onChangePassword}
      />
      <button type="submit">Submit</button>
    </form>
  )
}