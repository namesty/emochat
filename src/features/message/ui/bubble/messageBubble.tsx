import React from 'react'
import styles from './messageBubble.module.css'
import { Message } from '../../domain/message'
import { DateTime } from 'luxon'

interface Props {
  message: Message
  mine: boolean
  isGroup: boolean
  colorUserMap: { [email: string]: string }
}

export const MessageBubble: React.FC<Props> = ({message, mine, isGroup, colorUserMap}) => {

  const isoDate = new Date(parseInt(message.date)).toISOString()
  const formattedDate = DateTime.fromISO(isoDate).toFormat('ccc dd, LLL - T')

  return (
    <div className={`${styles.container} ${mine && styles.altContainer}`}>
      <div className={`${styles.body} ${mine && styles.altBody}`}>
        { isGroup &&
          <p
            className={styles.name}
            style={{ color: colorUserMap[message.from.email] }}
          >{`${message.from.name} ${message.from.lastName}`}</p>
        }
        <p className={styles.contentText}>{message.content}</p>
        <div className={styles.hour}>
          <p className={styles.hourText}>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}