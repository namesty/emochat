import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://192.168.1.40:5000/'
})

export const createAuthHeader = () => {
  const token = localStorage.getItem('token')

  return {
    Authorization: `Bearer ${token}`
  }
}