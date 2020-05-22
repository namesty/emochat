import React from 'react'
import styles from './listItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bigText: string
  smallText: string,
  leftIcon?: {
    icon: IconDefinition,
    onPress?: () => void
  }
  rightIcon?: {
    icon: IconDefinition,
    onPress?: () => void
  }
}

export const ListItem: React.FC<Props> = ({bigText, smallText, leftIcon, rightIcon, ...rest}) => {

  return (
    <div className={styles.container}>
      <div className={styles.body} {...rest}>
        {
          leftIcon &&         
          <button className={styles.iconContainer} onClick={leftIcon.onPress}>
            <FontAwesomeIcon color='#fff' size={'2x'} icon={leftIcon.icon}/>
          </button>
        }
        <div className={styles.textContainer}>
          <div className={styles.nameTextContainer}>
            <p className={styles.nameText}>{bigText}</p>
          </div>
          <div className={styles.footerTextContainer}>
            <p className={styles.footerText}>{smallText}</p>
          </div>
        </div>
        {
          rightIcon &&         
          <button className={`${styles.iconContainer} ${styles.rightIconContainer}`} onClick={(e)=> {
            e.stopPropagation()
            if(rightIcon.onPress) {
              rightIcon.onPress()
            }
          }}>
            <FontAwesomeIcon size={'2x'} icon={rightIcon.icon}/>
          </button>
        }
      </div>
    </div>
  )

}