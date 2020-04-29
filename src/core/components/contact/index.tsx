import React from 'react'
import styles from './contact.module.css'
import { User } from '../../../features/user/domain/user'

interface Props {
  user: User
  userSetter: (contact: User) => void
}

export const ContactBox: React.FC<Props> = ({user, userSetter}) => {

  return (
    <button className={styles.container} onClick={() => userSetter(user)}>
      <div className={styles.textContainer}>
        <div className={styles.nameTextContainer}>
          <p className={styles.nameText}>{`${user.name} ${user.lastName}`}</p>
        </div>
        <div className={styles.footerTextContainer}>
          <p className={styles.footerText}>{user.email}</p>
        </div>
      </div>
    </button>
  )

}