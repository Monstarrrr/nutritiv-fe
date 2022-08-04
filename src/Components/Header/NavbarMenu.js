import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileNavMenu, closeNavbarMenu } from '../../Redux/reducers/modals';

const Container = styled(motion.div)`
  background: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 10;
`

export const NavbarMenu = ({ open }) => {
  const dispatch = useDispatch();
  
  const handleCloseMenu = () => {
    dispatch(closeMobileNavMenu())
  }
  
  return (
    <AnimatePresence>
      {open && (
        <Container
          initial={{}}
          animate={{}}
          exit={{}}
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