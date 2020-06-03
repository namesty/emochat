import React from 'react'
import styles from './sheetLayout.module.css'

export const SheetLayout: React.FC = ({children}) => {
  return (
    <>
    <div className={styles.backgroundDecoration}></div>
    <div className={styles.backgroundContainer}>
      <div className={styles.mainContainer}>
        {children}
      </div>
    </div>
    </>
  )
}