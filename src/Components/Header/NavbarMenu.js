import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { closeMobileNavMenu } from '../../Redux/reducers/modals';
import { Link, useLocation } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const location = useLocation();
  
  const handleCloseMenu = () => {
    dispatch(closeMobileNavMenu());
  }
  
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
              <Link
                key={link.to}
                to={link.to} 
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </Container>
      )}
    </AnimatePresence>
  )
}