import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Homepage.module.scss';

export const Welcome = () => {
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  const pageAnimation = {
    exit: {
      opacity: 0,
      transition: {
        default: { duration: 0.4 },
      },
    },
  }
  
  return (
    <div 
      variants={pageAnimation} 
      exit="exit"
    >
      <br />
      <div>
        <h2 className={styles.title}>
          <span
            whilehover={{opacity: 0.5}}
          >
            Homepage
          </span>
        </h2>
      </div>
      {
        !loggedIn && (
          <div>
            You are not connected
          </div>
        )
      }
    </div>
  )
}