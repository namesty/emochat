import React, { useState, useEffect } from 'react'
import { getUser } from '../../utils/auth'
import io from 'socket.io-client'
import { User } from '../../User'
import { Message } from '../../Message'

export const Home: React.FC = () => {
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([])
  const user = getUser() as User

  useEffect(() => {
    if(!socket)
    setSocket(io('http://localhost:3500'))
  }, [])

  if(socket) {
    socket.on('askForToken', () => {
      socket.emit('sendToken', user.token)
    })
  
    socket.on('newMessage', (message: Message) => {
      setMessages([...messages, message])
    })
  }

  const onChange = (event: any) => {
    setMessage(event.target.value)
  }

  const onPress = () => {
    if(socket) {
      socket.emit('newMessage', {
        to: 'a@gmail.com',
        content: message
      })

      setMessages([...messages, {
        to: 'a@gmail.com',
        content: message,
        from: 'a@gmail.com',
        date: Date.now().toString()
      }])
    }
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

      { messages.map((msg, i) => {
        return <div key={i} style={{color: msg.to === user.email? 'red': 'blue'}}>{msg.content}</div>
      })}
    </div>
  )
}