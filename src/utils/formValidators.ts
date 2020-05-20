import validator from 'validator'

export const validateName = (name: string) => {
  const errors: string[] = []

  if(validator.isEmpty(name)) errors.push('Cannot be empty')

  return errors
}

export const validateEmail = (email: string) => {
  const errors: string[] = []

  if(validator.isEmpty(email)) errors.push('Cannot be empty')
  if(!validator.isEmail(email)) errors.push('Invalid format')

  return errors
}

export const validatePassword = (password: string) => {
  const errors: string[] = []

  if(validator.isEmpty(password)) errors.push('Cannot be empty')
  if(!validator.isLength(password, {
    min: 8
  })) errors.push('Must be at least 8 characters long')

  return errors
}

export const validatePasswordConf = (password: string, passwordConf: string) => {
  const errors: string[] = []

  if(password !== passwordConf) errors.push("Passwords must match")

  return errors
}