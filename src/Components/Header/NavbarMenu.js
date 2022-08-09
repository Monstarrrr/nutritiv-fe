import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileNavMenu } from '../../Redux/reducers/modals';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { tokens } from '../../Helpers/styleTokens';
import { CloseIcon } from '../Icons/CloseIcon';

const Container = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
`

const Shadow = styled(motion.div)`
  position: absolute;
  opacity: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  scale: 0.65;
  transform: translateX(-57vw);
  background: #0012734f;
  border-radius: 54px;
`

const LeftSide = styled.div``
const RightSide = styled.div``
const Header = styled(motion.div)`
  display: flex;
  height: 11vh;
  margin: 0 15px;
  justify-content: space-between;
  ${LeftSide}, ${RightSide} {
    align-items: center;
    display: flex;
    svg {
      cursor: pointer;
    }
  }
`
const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  img {
    height: 36px;
  }
`

const links = [
  {to: "/welcome", label: "Welcome"},
  {to: "/about-us", label: "About us"},
  {to: "/shop", label: "Shop"},
]

export const NavbarMenu = ({ open }) => {
  const [leavingShadow, setLeavingShadow] = useState(false)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleCloseMenu = () => {
    dispatch(closeMobileNavMenu());
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeavingShadow(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  const handleClick = (link) => {
    if(location.pathname !== link) {
      setLeavingShadow(true);
      navigate(link)
    }
  }
  
  console.log('# location.pathname :', location.pathname)
  console.log('# leavingShadow :', leavingShadow)
  
  // const variants = {
  //   initial: {
  //     opacity: 1,
  //     scale: 1,
  //     x: '-57vw',
  //   },
  //   shadowIn: {
  //     opacity: 1,
  //     scale: 1,
  //     x: '-57vw',
  //     transition: {
  //       duration: 0
  //     }
  //   },
  //   shadowOut: {
  //     opacity: 0,
  //     scale: 0.8,
  //     x: '-54vw',
  //     transition: {
  //       duration: 0.2
  //     }
  //   }
  // }
  
  return (
    <AnimatePresence>
      {open && (
        <Container>
          {/* <Shadow
            variants={variants}
            animate={leavingShadow ? "shadowOut" : "shadowIn"}
            initial="initial"
          /> */}
          <Header>
            <LeftSide>
              <LogoLink
                active={location.pathname === "/welcome" ? 1 : undefined}
                to="/welcome"
              >
                <img
                  alt="nutritiv logo"
                  src="/logo.png"
                />
              </LogoLink>
            </LeftSide>
            <RightSide>
              <div onClick={() => handleCloseMenu()}>
                <CloseIcon
                  color={tokens.color.contrastLight}
                  height={32}
                  strokeWidth={2} 
                />
              </div>
            </RightSide>
          </Header>
          <ul>
            {links.map(link => (
              <button 
                onClick={() => handleClick(link.to)}
                key={link.to}
                to={link.to} 
              >
                {link.label}
              </button>
            ))}
          </ul>
        </Container>
      )}
    </AnimatePresence>
  )
}