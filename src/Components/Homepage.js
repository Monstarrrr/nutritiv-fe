import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Homepage.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

export const Welcome = () => {
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  const pageAnimation = {
    exit: {
      x: "-100vw",
      transition: {
        default: { duration: 1 },
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
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ height: "200px" }}
        >
          <motion.span
            transition={{duration: 0.2}}
            whileHover={{opacity: 0.5}}
          >
            Homepage
          </motion.span>
        </motion.h2>
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