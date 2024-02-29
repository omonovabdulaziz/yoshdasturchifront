import React from 'react'
import styles from "./ErrorBoundary.module.css"
const ErrorBoundary = () => {
  return (
    <div className={styles.error}>
      <p>
              OOPPs 
      is this site available only for laptop and desctop 
      </p>

    </div>
  )
}

export default ErrorBoundary