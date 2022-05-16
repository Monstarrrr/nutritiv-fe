import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Homepage.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

export const Welcome = () => {
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  const array = [
    "Hello",
    "hi",
    "hola",
    "salut",
    "yo"
  ]
  
  const pageAnimation = {
    exit: {
      opacity: 0,
      transition: {
        default: { duration: 0.4 },
      },
    },
  }
  
  return (
    <motion.div 
      variants={pageAnimation} 
      exit="exit"
    >
      <br />
      <div>
        <h2 className={styles.title}>
          <motion.span
            whileHover={{opacity: 0.5}}
          >
            Homepage
          </motion.span>
        </h2>
      </div>
      {
        !loggedIn && (
          <div>
            You are not connected
          </div>
        )
      }
    </motion.div>
  )
}