import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Message } from '../../Message'
import { MessageBox } from '../../core/components/message/message'
import styles from './home.module.css'
import { ContactBox } from '../../core/components/contact'
import { useHistory } from 'react-router-dom'
import { AuthService } from '../../features/auth/domain/auth-service'
import { User } from '../../features/user/domain/user'

export const Home: React.FC = () => {
  //TODO: maybe making a factory for this?
  const authService = new AuthService()

  const history = useHistory()
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [chattingUser, setChattingUser] = useState<User>()
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([])
  const authData = authService.getFromStorage()

  useEffect(() => {
    if(!socket)
    setSocket(io('http://localhost:3500'))
  }, [])

  //TODO: Fix this with proper route protection
  if(!authData) {
    history.push('/login')
    return (<></>)
  }

  if(socket) {
    socket.on('askForToken', () => {
      socket.emit('sendToken', authData.token)
    })
  
    socket.on('newMessage', (message: Message) => {
      setMessages([...messages, message])
    })

    socket.on('usersChanged', (currentUsers: User[]) => {
      setUsers(currentUsers)
    })

  }

  const onChange = (event: any) => {
    setMessage(event.target.value)
  }

  const onSendMessage = () => {
    if(socket && chattingUser) {
      socket.emit('newMessage', {
        to: chattingUser.email,
        content: message
      })

      setMessages([...messages, {
        to: chattingUser.email,
        content: message,
        from: authData.user.email,
        date: Date.now().toString()
      }])
    }
  }

  console.log(chattingUser)

  const onPressContact = (chattingUser: User) => setChattingUser(chattingUser)

  return (
    <div className={styles.pageContainer}>

      <div className={styles.contacts}>
        <div className={styles.contactsHeader}>
          <p>Contacts</p>
        </div>
        <div className={styles.contactsBody}>
          {
            users.map((usr: User, i) => {
              return (
                <ContactBox
                  key={i}
                  user={usr}
                />
              )
            })
          }
        </div>
      </div>
      <div className={styles.chat}>
        <div className={styles.chatHeader}>

        </div>
        <div className={styles.chatBody}>
          { messages.map((msg, i) => {
            return (
              <MessageBox
                key={i}
                time={msg.date.toString()}
                content={msg.content}
                mine={msg.from.toString() === authData.user.email}
              />
            )
          })}
        </div>
        <div className={styles.chatInput}>
          <input
            type='text'
            value={message}
            onChange={onChange}
          />
          <button onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}