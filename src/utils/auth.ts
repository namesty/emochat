import axios from 'axios'
import { User } from '../User'

const baseUrl = 'http://localhost:5000'

export const login = async (email: string, password: string): Promise<User> => {
  try{
    const { data } = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password
    })
    
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    return {
      email: data.user.email,
      name: data.user.name,
      lastName: data.user.lastName,
      token: data.token
    }

  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getUser = (): User| null => {

  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  if(!user || !token) {

    return null

  } else {

    const parsedUser = JSON.parse(user)

    return {
      email: parsedUser.email,
      name: parsedUser.name,
      lastName: parsedUser.lastName,
      token
    }
  }
}

export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  return (!!user && !!token)
}