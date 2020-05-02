import React from 'react'
import styles from './listItem.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bigText: string
  smallText: string
}

export const ListItem: React.FC<Props> = ({bigText, smallText, ...rest}) => {

  return (
    <button className={styles.container} {...rest}>
      <div className={styles.textContainer}>
        <div className={styles.nameTextContainer}>
          <p className={styles.nameText}>{bigText}</p>
        </div>
        <div className={styles.footerTextContainer}>
          <p className={styles.footerText}>{smallText}</p>
        </div>
      </div>
    </button>
  )

}