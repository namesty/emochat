import React from 'react'
import styles from './header.module.css'

interface Props {
  picture?: string
  fullName: string
}

export const Header: React.FC<Props> = ({ fullName, picture }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{fullName.toUpperCase()}</p>
    </div>
  )
}