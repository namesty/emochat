import React from 'react'
import styles from './messageBubble.module.css'
import { Message } from '../../domain/message'
import { DateTime } from 'luxon'
import { Gradient } from '../../../emotion/domain/gradient'
import { CustomLoader } from '../../../../core/components/loader/loader'

interface Props {
  message: Message
  mine: boolean
  isGroup: boolean
  colorUserMap: { [email: string]: string }
  gradient: Gradient | undefined
  loading?: boolean
}

export const MessageBubble: React.FC<Props> = ({message, mine, isGroup, gradient, loading}) => {

  const isoDate = new Date(parseInt(message.date)).toISOString()
  const formattedDate = DateTime.fromISO(isoDate).toFormat('ccc dd, LLL - T')

  return (
    <div className={`${styles.container} ${mine && styles.altContainer}`}>
      {
        loading && 
        <div className={styles.loaderContainer}>
          <CustomLoader width={25} height={25}/>
        </div>
      }
      <div className={`${styles.body} ${mine && !isGroup && styles.altBody}`}>
        { isGroup &&
        <div
          className={styles.header}
          style={{ background: gradient? gradient.gradient : ''}}>
          <p
            className={styles.name}
          >{`${message.from.name} ${message.from.lastName}`}</p>
        </div>
        }
        <p className={styles.contentText}>{message.content}</p>
        <div className={`${styles.hour} ${mine && !isGroup && styles.altHour}`}>
          <p className={styles.hourText}>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}