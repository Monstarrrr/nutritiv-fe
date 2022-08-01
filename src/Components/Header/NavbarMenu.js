import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { closeNavbarMenu } from '../../Redux/reducers/modals';

const Container = styled(motion.div)`
  background: green;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 10;
`

export const NavbarMenu = ({ open }) => {
  const dispatch = useDispatch();
  
  const handleCloseMenu = () => {
    dispatch(closeNavbarMenu())
  }
  
  return (
    <AnimatePresence>
      {open && (
        <Container
          initial={{x: "100vw"}}
          animate={{x: 0}}
          exit={{x: "100vw"}}
        >
          <div onClick={() => handleCloseMenu()}>
            Close
          </div>
          <ul>
            <li>hello</li>
            <li>hi</li>
          </ul>
        </Container>
      )}
    </AnimatePresence>
  )
}