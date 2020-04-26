import React, { useState } from 'react'
import { getUser } from '../../utils/auth'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

export const Home: React.FC = () => {
  const [message, setMessage] = useState('')

  const history = useHistory()
  const user = getUser()

  if(!user) {
    history.push("/login")
    return (<></>)
  }

  socket.on('askForToken', () => {
    socket.emit('sendToken', user.token)
  })

  const onChange = (event: any) => {
    setMessage(event.target.value)
  }

  const onPress = () => {
    socket.emit('newMessage', {
      to: 'test@gmail.com',
      content: message
    })
  }

  return (
    <div>
      <h2> HOME </h2>
      <div> Hello {user.name} </div>
      <input
        type='text'
        value={message}
        onChange={onChange}
      />
      <button onClick={onPress}>send</button>
    </div>
  )
}