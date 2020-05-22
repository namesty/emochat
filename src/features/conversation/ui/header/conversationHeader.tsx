import React from 'react'
import styles from './header.module.css'

interface Props {
  fullName?: string,
  gradient?: string
}

export const Header: React.FC<Props> = ({ fullName, gradient }) => {
  return (
    <div className={styles.container} style={{ background: gradient? gradient: ''}}>
      <p className={styles.text}>{fullName? fullName.toUpperCase(): ''}</p>
    </div>
  )
}