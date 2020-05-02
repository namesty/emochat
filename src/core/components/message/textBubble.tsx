import React from 'react'
import defaultStyles from './textBubble.module.css'
import altStyles from './altTextBubble.module.css'

interface Props {
  time: string,
  content: string,
  defaultStyle: boolean
}

export const TextBubble: React.FC<Props> = ({time, content, defaultStyle}) => {

  const styles = defaultStyle? defaultStyles: altStyles

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