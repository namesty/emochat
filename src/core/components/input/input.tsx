import React from 'react'
import styles from './input.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickButton?: () => void
}

export const Input: React.FC<Props> = ({onClickButton, ...rest}) => {
  return (
    <div className={styles.container}>
      <input {...rest} className={styles.input} />
      <a className={styles.button} onClick={onClickButton}>
        <FontAwesomeIcon color={'#eeeeee'} icon={faPaperPlane}/>
      </a>
    </div>
  )
}