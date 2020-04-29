import React from 'react'
import defaultStyles from './message.module.css'
import altStyles from './altMessage.module.css'

interface Props {
  time: string,
  content: string,
  mine: boolean
}

export const MessageBox: React.FC<Props> = ({time, content, mine}) => {

  const styles = mine? defaultStyles: altStyles

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <p className={styles.contentText}>{content}</p>
      </div>
      <div className={styles.footer}>
        <div></div>
        <p className={styles.timeText}>{time}</p>
      </div>
    </div>
  )

}