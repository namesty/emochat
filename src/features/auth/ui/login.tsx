import React, { useState } from 'react'
import { AuthRepositoryFactory } from '../infrastructure/auth-repository-factory'
import { useHistory } from 'react-router-dom'

export const Login: React.FC = () => {
  const authRepository = AuthRepositoryFactory.build()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const onSubmit = async (event: any) => {
    event.preventDefault()
    await authRepository.login(email, password)
    history.push('/home')
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