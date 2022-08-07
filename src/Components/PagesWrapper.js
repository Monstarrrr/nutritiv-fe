/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { tokens } from '../Helpers/styleTokens'
import { closeMobileNavMenu } from '../Redux/reducers/modals'
import { GradientBackground } from './GradientBackground'
import Navbar from './Header/Navbar'

const Pages = styled(motion.div)`
  background-size: 100% 100%;
  background-origin: border-box;
  color: ${tokens.color.contrastLight};
  overflow: ${props => (
    props.minimized ? "hidden" : "auto"
  )};
  position: relative;
  scale: 1;
  width: 100%;
  &:after {
    display: ${props => (
      props.minimized ? "initial" : "none")
    };
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 10;
  }
`

export const PagesWrapper = ({ minimized }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const handleMobileNavMenu = () => {
    minimized && dispatch(
      closeMobileNavMenu()
    )
  }
  
  const pagesVariants = {
    minimized: {
      // backgroundColor: tokens.color.primary,
      backgroundImage: location.pathname === "/welcome" ? (
        "linear-gradient(rgba(20, 122, 165, 1) 0px, rgba(20, 122, 165, 1) 600px, rgba(2, 0, 71, 1) 1250px)"
      ) : (
        "linear-gradient(rgba(20, 122, 165, 1) 0px, rgba(20, 122, 165, 1) 0px, rgba(2, 0, 71, 1) 0px)"
      ),
      borderRadius: tokens.borderRadius.xxl,
      height: `100vh`,
      translateX: '-50vw',
      scale: 0.75,
      transition: {
        backgroundImage: {
          duration: 0
        }
      }
    },
    normalSize: {
      backgroundColor: tokens.color.transparent,
      backgroundImage: location.pathname === "/welcome" ? (
        "linear-gradient(rgba(20, 122, 165, 0) 0px, rgba(20, 122, 165, 0) 600px, rgba(2, 0, 71, 0) 1250px)"
      ) : (
        "linear-gradient(rgba(20, 122, 165, 1) 0px, rgba(20, 122, 165, 1) 0px, rgba(2, 0, 71, 1) 0px)"
      ),
      borderRadius: 0,
      height: `100%`,
      translateX: 0,
      scale: 1,
      transition: {
        height: {
          delay: 1,
        },
      },
    },
  }
  
  return (
    <Pages
      animate={minimized ? 'minimized' : 'normalSize'}
      variants={pagesVariants}
      initial={false}
      minimized={minimized ? 1 : undefined}
      onClick={() => handleMobileNavMenu()}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Pages>
  )
}