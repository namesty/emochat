import React from 'react'
import styles from './messageInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faBrain } from '@fortawesome/free-solid-svg-icons'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickSend?: () => void
  onClickEmotion?: () => Promise<void>
}

export const MessageInput: React.FC<Props> = ({onClickSend, onClickEmotion, ...rest}) => {
  return (
    <div className={styles.container}>
      <input {...rest} className={styles.input} />
      <a className={`${styles.button} ${styles.emotionsButton}`} onClick={onClickEmotion}>
        <FontAwesomeIcon color={'#eeeeee'} icon={faBrain}/>
      </a>
      <a className={`${styles.button} ${styles.sendButton}`} onClick={onClickSend}>
        <FontAwesomeIcon color={'#eeeeee'} icon={faPaperPlane}/>
      </a>
    </div>
  )
}