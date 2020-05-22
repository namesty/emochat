import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import styles from './icon.module.css'

interface Props extends FontAwesomeIconProps {
  onPress?: () => void
}

export const Icon: React.FC<Props> = ({ onPress, ...rest }) => {
  return (
    <div className={styles.iconContainer} onClick={onPress}>
      <FontAwesomeIcon {...rest}/>
    </div>
  )
}