import React from 'react'
import Loader from 'react-loader-spinner'
import styles from './loader.module.css'

interface Props {
  text?: string
  height?: number
  width?: number
  color?: string
}

export const CustomLoader: React.FC<Props> = ({ text, height, width, color }) => {
  return (
    <div className={styles.loaderContainer}>
      <Loader
        type="ThreeDots"
        color={color || "#3a3a3a"}
        height={height || 50}
        width={width || 75}
        visible={true}
      />
      { text &&
        <div className={styles.loaderTextContainer}>
          <p className={styles.loaderText}>{text}</p>
        </div>
      }
    </div>
   )
}