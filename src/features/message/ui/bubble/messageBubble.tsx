import React from 'react'
import styles from './messageBubble.module.css'
import { Message } from '../../domain/message'

interface Props {
  message: Message
  mine: boolean
}

export const MessageBubble: React.FC<Props> = ({message, mine}) => {
  return (
    <div className={`${styles.container} ${mine && styles.altContainer}`}>
      <div className={`${styles.body} ${mine && styles.altBody}`}>
        <p className={styles.contentText}>{message.content}</p>
      </div>
      <div className={styles.hour}>
        <p className={styles.hourText}>{message.date}</p>
      </div>
    </div>
  )
}