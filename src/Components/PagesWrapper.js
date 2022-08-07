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
  overflow: auto;
  position: relative;
  scale: 1;
  width: 100%;
  background-size: 100% 100%;
  &:after {
    display: ${props => (props.minimized ? "initial" : "none")};
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
  }
`

export const PagesWrapper = ({ minimized }) => {
  const dispatch = useDispatch();
  
  const handleMobileNavMenu = () => {
    minimized && dispatch(
      closeMobileNavMenu()
    )
  }
  
  const pagesVariants = {
    minimized: {
      backgroundColor: tokens.color.primary,
      border: `${tokens.border.md} ${tokens.color.accentTransparent}`,
      borderRadius: tokens.borderRadius.xxl,
      height: `100vh`,
      translateX: '-50vw',
      scale: 0.75,
    },
    normalSize: {
      backgroundColor: tokens.color.transparent,
      border: "none",
      borderRadius: "none",
      height: `100%`,
      translateX: 0,
      scale: 1,
      transition: {
        height: {
          delay: 3,
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