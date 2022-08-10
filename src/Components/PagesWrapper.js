/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { tokens } from '../Helpers/styleTokens'
import { closeMobileNavMenu } from '../Redux/reducers/modals'
import Navbar from './Header/Navbar'

const Pages = styled(motion.div)`
  background-size: 100% 100%;
  background-origin: border-box;
  color: ${tokens.color.contrastLight};
  overflow-y: hidden;
  position: relative;
  transform-style: preserve-3d;
  scale: 1;
  width: 100%;
  &:before {
    display: ${props => (
      props.minimized ? "initial" : "none"
    )};
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
  const [duration, setDuration] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if(minimized) {
        setDuration(0.22)
      } else {
        setDuration(0)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [minimized]);

  const handleMobileNavMenu = () => {
    minimized && dispatch(
      closeMobileNavMenu()
    )
  }
  
  const pagesVariants = {
    initial: {
      borderRadius: tokens.borderRadius.xxl,
      height: `100vh`,
      opacity: 0,
      scale: 0.78,
      translateX: "50vw",
      rotateY: "-20deg",
      transformStyle: "preserve-3d",
      left: "-105vw",
    },
    exit: {
      borderRadius: tokens.borderRadius.xxxl,
      opacity: 0,
      translateX: "-55vw",
      rotateY: "20deg",
      scale: 0.72,
      transformStyle: "preserve-3d",
      transition: {
        duration: 0.22
      }
    },
    normalSizeHomepage: {
      backgroundImage: "linear-gradient(rgba(20, 122, 165, 0) 0px, rgba(20, 122, 165, 0) 600px, rgba(2, 0, 71, 0) 1250px)",
      borderRadius: 0,
      height: `100%`,
      opacity: 1,
      translateX: 0,
      scale: 1,
      rotateY: "0deg",
      left: "0vw",
      transition: {
        backgroundImage: {
          duration: 0.4,
        },
        height: {
          delay: 1,
        },
      },
    },
    normalSizeOtherPage: {
      backgroundImage: "linear-gradient(rgba(20, 122, 165, 0) 0px, rgba(20, 122, 165, 0) 0px, rgba(2, 0, 71, 0) 0px)",
      borderRadius: 0,
      height: `100%`,
      opacity: 1,
      translateX: 0,
      scale: 1,
      rotateY: "0deg",
      left: "0vw",
      transition: {
        backgroundImage: {
          duration: 0.4,
        },
        height: {
          delay: 1,
        },
      },
    },
    minimizedHomepage: {
      backgroundImage: "linear-gradient(rgba(20, 122, 165, 1) 0px, rgba(20, 122, 165, 1) 600px, rgba(2, 0, 71, 1) 1250px)",
      borderRadius: tokens.borderRadius.xxl,
      height: `100vh`,
      opacity: 1,
      translateX: '-44vw',
      scale: 0.75,
      rotateY: "0deg",
      left: "0vw",
      transition: {
        backgroundImage: {
          duration: duration,
        }
      }
    },
    minimizedOtherPage: {
      backgroundImage: "linear-gradient(rgba(2, 0, 71, 1) 0px, rgba(2, 0, 71, 1) 600px, rgba(2, 0, 71, 1) 1250px)",
      borderRadius: tokens.borderRadius.xxl,
      height: `100vh`,
      opacity: 1,
      translateX: '-44vw',
      scale: 0.75,
      rotateY: "0deg",
      left: "0vw",
      transition: {
        backgroundImage: {
          duration: duration
        }
      }
    }
  }
  
  return (
    <Pages
      animate={
        minimized ? (
          location.pathname === "/welcome" ? "minimizedHomepage" : "minimizedOtherPage"
        ) : (
          location.pathname === "/welcome" ? "normalSizeHomepage" : "normalSizeOtherPage"
        )
      }
      initial={
        minimized ? "initial" : false
      }
      exit={minimized && "exit"}
      minimized={minimized ? 1 : undefined}
      onClick={() => handleMobileNavMenu()}
      variants={pagesVariants}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Pages>
  )
}