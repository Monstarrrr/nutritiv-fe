import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileNavMenu } from '../../Redux/reducers/modals';
import { Link } from 'react-router-dom';

const Container = styled(motion.div)`
  background: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
`

export const NavbarMenu = ({ open }) => {
  const dispatch = useDispatch();
  
  const handleCloseMenu = () => {
    dispatch(closeMobileNavMenu());
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
            <Link to="/welcome">welcome</Link><br/>
            <Link to="/about-us">about-us</Link><br/>
            <Link to="/shop">shop</Link>
          </ul>
        </Container>
      )}
    </AnimatePresence>
  )
}