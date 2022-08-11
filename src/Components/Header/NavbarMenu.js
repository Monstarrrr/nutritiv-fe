import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { closeMobileNavMenu } from '../../Redux/reducers/modals';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { tokens } from '../../Helpers/styleTokens';
import { Icon } from '../Icons/Icon';
import { useSelector } from 'react-redux';
import { Logout } from '../Authentication/Logout';

const LeftSide = styled.div``
const RightSide = styled.div``
const NavFooter = styled(motion.div)``
const LinksContainer = styled.div``
const CustomLink = styled(Link)``
const LinkContainer = styled(({active, ...props }) => <div {...props} />)`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: ${tokens.spacing.md} 0;
  opacity: ${props => 
    props.active ? 1 : 0.65
  };
  ${CustomLink} {
    color: ${tokens.color.contrastLight};
    font-size: ${tokens.font.fontSize.md};
    flex-shrink: 0;
    text-decoration: none;
  }
  svg {
    padding-right: ${tokens.spacing.lg};
    width: auto;
  }
`

const NavHeader = styled(motion.div)`
  ${LeftSide}, ${RightSide} {
    align-items: center;
    display: flex;
    svg {
      cursor: pointer;
    }
  }
`

const Container = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
  ${NavHeader}, ${NavFooter} {
    align-items: center;
    display: flex;
    height: 12vh;
    justify-content: space-between;
    margin: 0 ${tokens.spacing.xl};
  }
`


const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  img {
    height: 36px;
  }
`


const Navigation = styled(motion.div)`
  align-items: end;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin-right: 14vw;
  ${LinksContainer} {
    display: flex;
    flex-direction: column;
  }
`


const links = [
  {to: "/welcome", label: "Home", icon: "home"},
  {to: "/about-us", label: "About us", icon: "users"},
  {to: "/shop", label: "Shop", icon: "cart"},
  {to: "/chat", label: "Chat", icon: "chat"},
]

export const NavbarMenu = ({ open }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const [active, setActive] = useState([]);
  
  
  useEffect(() => {
    setActive(location.pathname)
  }, [location.pathname]);
  
  const handleCloseMenu = () => {
    dispatch(closeMobileNavMenu());
  }
  const handleLinkClick = (link) => {
    navigate(link);
    active === link && dispatch(closeMobileNavMenu());
  }

  return (
    <AnimatePresence>
      {open && (
        <Container>
          <NavHeader>
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
                <Icon
                  color={tokens.color.contrastLight}
                  height={32}
                  strokeWidth={2}
                  name="close" 
                />
              </div>
            </RightSide>
          </NavHeader>
          <Navigation>
            <LinksContainer>
              {links.map(link => (
                <LinkContainer 
                  active={active === link.to}
                  onClick={() => handleLinkClick(link.to)}
                  key={link.to}
                >
                  <Icon
                    color={tokens.color.contrastLight}
                    filled={active === link.to}
                    height={30}
                    name={link.icon}
                    strokeWidth={2}
                  />
                  <CustomLink
                    name={link.to}
                    to={link.to}
                  >
                    {link.label}
                  </CustomLink>
                </LinkContainer>
              ))}
            </LinksContainer>
          </Navigation>
          <NavFooter>
            {loggedIn ? (
              <Logout label />
            ) : (
              <div>
                
              </div>
            )}
          </NavFooter>
        </Container>
      )}
    </AnimatePresence>
  )
}