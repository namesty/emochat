import React, { useState, useContext } from 'react'
import { AuthRepositoryFactory } from '../../features/auth/infrastructure/auth-repository-factory'

export const Login: React.FC = () => {
  const authRepository = AuthRepositoryFactory.build()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: any) => {
    event.preventDefault()
    await authRepository.login(email, password)
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