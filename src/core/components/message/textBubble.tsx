import React from 'react'
import styles from './textBubble.module.css'

interface Props {
  time: string,
  content: string,
  mine: boolean
}

export const TextBubble: React.FC<Props> = ({time, content, mine}) => {
  return (
    <div className={`${styles.container} ${!mine && styles.altContainer}`}>
      <div className={`${styles.body} ${!mine && styles.altBody}`}>
        <p className={styles.contentText}>{content}</p>
      </div>
      <div className={styles.hour}>
        <p className={styles.hourText}>{time}</p>
      </div>
    </div>
  )
}