import React from 'react'
import styles from './listItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bigText: string
  smallText: string
  rightText?: string
  leftIcon?: {
    icon: IconDefinition
    onPress?: () => void
  }
  rightIcon?: {
    icon: IconDefinition
    onPress?: () => void
  }
}

export const ListItem: React.FC<Props> = ({bigText, smallText, leftIcon, rightIcon, rightText, ...rest}) => {

  return (
    <div className={styles.container}>
      <div className={styles.body} {...rest}>
        {
          leftIcon &&         
          <button className={`${styles.iconContainer} ${styles.leftIcon}`} onClick={leftIcon.onPress}>
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
        <div className={styles.rightContainer}>
          {
            rightIcon &&      
            <button className={`${styles.iconContainer} ${styles.rightIcon}`} onClick={(e)=> {
              e.stopPropagation()
              if(rightIcon.onPress) {
                rightIcon.onPress()
              }
            }}>
              <FontAwesomeIcon icon={rightIcon.icon} color={'#919191'}/>
            </button>
          }
          {
            rightText &&
            <p className={styles.rightText}>{rightText}</p>
          }
        </div>
      </div>
    </div>
  )

}