import React, { useState } from 'react'
import { AuthRepositoryFactory } from '../infrastructure/auth-repository-factory'
import { useHistory } from 'react-router-dom'
import styles from './login.module.css'
import { Input } from '../../../core/components/input/input'
import { CustomLoader } from '../../../core/components/loader/loader'

export const Login: React.FC = () => {
  const authRepository = AuthRepositoryFactory.build()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const onSubmit = async (event: any) => {
    event.preventDefault()
    try {
      setLoading(true)
      await authRepository.login(email, password)
      history.push('/home')
    } finally {
      setLoading(false)
    }

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
            <h1 className={styles.titleText}>LOGIN</h1>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.input}>
              <label className={styles.label}>Email</label>
              <Input
                type='text'
                name='email'
                data-testid={'i-email'}
                onChange={onChangeEmail}
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label}>Password</label>
              <Input
                type='password'
                name='password'
                data-testid={'i-password'}
                onChange={onChangePassword}
              />
            </div>
          </div>
          <div className={styles.submitButtonContainer}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading? <CustomLoader height={20} width={20} color={'#eeeeee'}/> : 'Login'}
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