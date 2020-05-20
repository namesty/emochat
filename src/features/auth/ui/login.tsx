import React, { useState } from 'react'
import { AuthRepositoryFactory } from '../infrastructure/auth-repository-factory'
import { useHistory } from 'react-router-dom'
import styles from './login.module.css'
import { Input } from '../../../core/components/input/input'

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

  const goToSignup = () => {
    history.push('/signup')
  }

  return (
    <div className={styles.main}>
      <form onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.titleContainer}>
            <h1>Login</h1>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.input}>
              <label className={styles.label}>Email</label>
              <Input
                type='text'
                name='email'
                onChange={onChangeEmail}
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label}>Password</label>
              <Input
                type='password'
                name='password'
                onChange={onChangePassword}
              />
            </div>
          </div>
          <div className={styles.submitButtonContainer}>
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </div>
          <div className={styles.footer}>
            <p>Not a member yet? <a onClick={goToSignup}>Create an account</a></p>
          </div>
        </div>
      </form>
    </div>
  )
}