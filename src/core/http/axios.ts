import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const setDefaultHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}