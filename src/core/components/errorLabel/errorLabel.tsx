import React from 'react'
import styles from './errorLabel.module.css'

interface Props {
  hasErrors: boolean,
  errors: { [key: string]: string[] },
  fieldName: string
}

export const ErrorLabel: React.FC<Props> = ({hasErrors, errors, fieldName}) => {
  return (
    <>
      {hasErrors && 
        <div className={styles.errorContainer}>
          {errors[fieldName].map((err, i) => {
            return (
              <p key={i} className={styles.errorLabel}>
                {err}
              </p>
            );
          })}
        </div>
      }
    </>
  )
}