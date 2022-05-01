import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Homepage.module.scss';

export const Welcome = () => {
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  return (
    <div>
      <br />
      <div>
        <h1 className={styles.title}>Homepage</h1>
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