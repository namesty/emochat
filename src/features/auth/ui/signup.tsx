import React, { useState } from 'react'
import { AuthRepositoryFactory } from '../infrastructure/auth-repository-factory'
import { useHistory } from 'react-router-dom'
import styles from './signup.module.css'
import { Input } from '../../../core/components/input/input'
import { validatePasswordConf, validatePassword, validateEmail, validateName } from '../../../utils/formValidators'
import { ErrorLabel } from '../../../core/components/errorLabel/errorLabel'
import { CustomLoader } from '../../../core/components/loader/loader'

interface ErrorObject {
  [key: string]: string[]
}

type Validator = (value: string) => string[]

export const Signup: React.FC = () => {
  const authRepository = AuthRepositoryFactory.build()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ErrorObject>({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const history = useHistory()

  const hasErrors = (field: string) => errors[field] && errors[field].length > 0
  const errFound = Object.values(errors).find(err => err.length > 0)
  const shouldDisable = loading || errFound || !firstName || !lastName || !email || !password || !passwordConf

  const onBlurField = (fieldName: string, fieldValue: string, validator: Validator) => {
    const errs = validator(fieldValue)

    setErrors({
      ...errors,
      [fieldName]: errs
    })
  }

  const onBlurPasswordConf = () => {
    const errs = validatePasswordConf(password, passwordConf)

    setErrors({
      ...errors,
      passwordConf: errs
    })
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()

    try {
      setLoading(true)
      await authRepository.signup(firstName, lastName, email, password)
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

  const onChangeFirstName = (event: any) => {
    setFirstName(event.target.value)
  }

  const onChangeLastName = (event: any) => {
    setLastName(event.target.value)
  }

  const onChangePasswordConf = (event: any) => {
    setPasswordConf(event.target.value)
  }

  return (
    <div className={styles.main}>
      <form onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.titleContainer}>
            <h1>Signup</h1>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.inputRow}>
              <div className={styles.input}>
                <label className={styles.label}>First name</label>
                <Input
                  data-testid={'s-firstName'}
                  type='text'
                  onChange={onChangeFirstName}
                  value={firstName}
                  onBlur={() => onBlurField("firstName", firstName, validateName)}
                />
                <ErrorLabel errors={errors} hasErrors={hasErrors("firstName")} fieldName="firstName" />
              </div>
              <div className={styles.input}>
                <label className={styles.label}>Last name</label>
                <Input
                  data-testid={'s-lastName'}
                  type='text'
                  value={lastName}
                  onChange={onChangeLastName}
                  onBlur={() => onBlurField("lastName", lastName, validateName)}
                />
                <ErrorLabel errors={errors} hasErrors={hasErrors("lastName")} fieldName="lastName" />
              </div>
            </div>
            
            <div className={styles.input}>
              <label className={styles.label}>Email</label>
              <Input
                data-testid={'s-email'}
                type='text'
                value={email}
                onChange={onChangeEmail}
                onBlur={() => onBlurField("email", email, validateEmail)}
              />
              <ErrorLabel errors={errors} hasErrors={hasErrors("email")} fieldName="email" />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.input}>
                <label className={styles.label}>Password</label>
                <Input
                  data-testid={'s-password'}
                  type='password'
                  value={password}
                  onChange={onChangePassword}
                  onBlur={() => onBlurField("password", password, validatePassword)}
                />
                <ErrorLabel errors={errors} hasErrors={hasErrors("password")} fieldName="password" />
              </div>
              <div className={styles.input}>
                <label className={styles.label}>Confirm password</label>
                <Input
                  data-testid={'s-confirmPassword'}
                  type='password'
                  value={passwordConf}
                  onChange={onChangePasswordConf}
                  onBlur={onBlurPasswordConf}
                />
                <ErrorLabel errors={errors} hasErrors={hasErrors("passwordConf")} fieldName="passwordConf" />
              </div>
            </div>
            
          </div>
          <div className={styles.submitButtonContainer}>
            <button type="submit" className={styles.submitButton} disabled={!!shouldDisable}>
              {loading? <CustomLoader height={20} width={20} color={'#eeeeee'}/> : 'Signup'}
            </button>
          </div>
          <div className={styles.footer}>
            <p>Already a member? <a href="/login">Log in</a></p>
          </div>
        </div>
      </form>
    </div>
  )
}