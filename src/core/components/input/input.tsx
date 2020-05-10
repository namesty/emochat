import React from 'react'
import styles from './input.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<Props> = ({...rest}) => {
  return (
    <div className={styles.container}>
      <input {...rest} className={styles.input} />
    </div>
  )
}