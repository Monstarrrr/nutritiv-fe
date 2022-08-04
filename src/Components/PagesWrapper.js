/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { tokens } from '../Helpers/styleTokens'
import { GradientBackground } from './GradientBackground'
import Navbar from './Header/Navbar'

const Pages = styled(motion.div)`
  overflow: auto;
  scale: 1;
  width: 100%;
  background-size: 100% 100%;
  z-index: -1;
`

export const PagesWrapper = ({ minimized }) => {
  
  const location = useLocation();
  const [homepage, setHomepage] = useState(false);

  useEffect(() => {
    setHomepage(
      location.pathname === "/welcome" 
      // && location.hash !== "menu"
    )
  }, [location.hash, location.pathname]);
  
  const pagesVariants = {
    minimized: {
      // background: tokens.color.primary,
      border: `${tokens.border.md} ${tokens.color.accentTransparent}`,
      borderRadius: tokens.borderRadius.xxl,
      height: `100vh`,
      translateX: '-50vw',
      scale: 0.75,
    },
    normalSize: {
      background: tokens.color.transparent,
      height: `100%`,
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
      minimized={minimized ? 1 : undefined}
      variants={pagesVariants}
      animate={minimized ? 'minimized' : 'normalResize'}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Pages>
  )
}