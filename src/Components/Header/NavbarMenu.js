import React, { useEffect, useRef, useState } from 'react'
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
  padding-right: ${props => 
    props.active ? `0` : `1px`
  };
  font-weight: ${props => 
    props.active ? `bold` : `normal`
  };
  opacity: ${props => 
    props.active ? 1 : 0.65
  };
  ${CustomLink} {
    color: ${tokens.color.contrastLight};
    font-size: ${tokens.font.fontSize.sm};
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
    height: 12.5vh;
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

const SignInContainer = styled(({active, ...props }) => <div {...props} />)`
  align-items: center;
  display: flex;
  opacity: ${props => 
    props.active ? 1 : 0.65
  };
  label {
    flex-shrink: 0;
  }
  svg {
    padding-right: ${tokens.spacing.md};
  }
`


const links = [
  {to: "/welcome",  label: "Home",     icon: "home",  loggedOut: true,  loggedIn: true},
  {to: "/about-us", label: "About us", icon: "users", loggedOut: true,  loggedIn: true},
  {to: "/shop",     label: "Shop",     icon: "tag",   loggedOut: true,  loggedIn: true},
  {to: "/chat",     label: "Support",  icon: "chat",  loggedOut: true,  loggedIn: true},
  {to: "/cart",     label: "Cart",     icon: "cart",  loggedOut: false, loggedIn: true},
  {to: "/profile",  label: "Account",  icon: "user",  loggedOut: false, loggedIn: true},
]

export const NavbarMenu = ({ open }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = useSelector(state => state.user.loggedIn);
  const [active, setActive] = useState([]);
  
  const timerRef = useRef();
  
  useEffect(() => {
    setActive(location.pathname)
  }, [location.pathname]);
  
  
  // Clear timer from handleInstantLink()
  useEffect(() => {
    const timeoutId = timerRef.current;
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  const handleInstantLink = (link) => {
    if(active === link) {
      dispatch(closeMobileNavMenu());
    } else {
      navigate(link)
      const timer = setTimeout(() => {
        dispatch(closeMobileNavMenu());
      }, 300);
      timerRef.current = timer;
    }
  };
  
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
                onClick={() => handleInstantLink("/welcome")}
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
                  height={28}
                  strokeWidth={2}
                  name="close" 
                />
              </div>
            </RightSide>
          </NavHeader>
          <Navigation>
            <LinksContainer>
              {links.map(link => (
                ((loggedIn && link.loggedIn) || (!loggedIn && link.loggedOut)) && (  
                  <LinkContainer 
                    active={active === link.to}
                    onClick={() => handleLinkClick(link.to)}
                    key={link.to}
                  >
                    <Icon
                      color={tokens.color.contrastLight}
                      filled={active === link.to}
                      height={26}
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
                )
              ))}
            </LinksContainer>
          </Navigation>
          <NavFooter>
            {loggedIn ? (
              <Logout label />
            ) : (
              <SignInContainer
                active={active === "/login"}
                onClick={() => handleInstantLink("/login")}
              >
                <Icon
                  color={tokens.color.contrastLight}
                  height={25}
                  strokeWidth={2}
                  filled
                  name="login"
                />
                <label>
                  Sign In
                </label>
              </SignInContainer>
            )}
          </NavFooter>
        </Container>
      )}
    </AnimatePresence>
  )
}