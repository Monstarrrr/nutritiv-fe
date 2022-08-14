/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { mediaQueries, mediaQuery, tokens } from '../../Helpers/styleTokens';
import { AnimatePresence, motion } from 'framer-motion';
import { DelayLink } from '../DelayLink';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Icon } from '../Icons/Icon';
import { Logout } from '../Authentication/Logout';
import { NutriButton } from '../NutriButton';
import { openMobileNavMenu } from '../../Redux/reducers/modals';

// Styles
const LogoSide = styled.div``
const NavSide = styled.div``
const ProfileSide = styled.div``
const NavLinkWrapper = styled(motion.div)`
  cursor: pointer;
  position: relative;
  user-select: none;
`
const Nav = styled(motion.nav)`
  align-items: center;
  border-bottom: ${tokens.border.sm};
  border-color: ${tokens.color.transparentLight};
  display: flex;
  font-size: ${tokens.font.fontSize.sm};
  height: ${tokens.navHeight.md};
  justify-content: space-between;
  left: 0;
  max-width: ${tokens.maxWidth.xl};
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 ${tokens.spacing.md};
  width: auto;
  z-index: 9;
  ${mediaQuery[1]} {
    height: ${tokens.navHeight.xl};
    padding: 0 ${tokens.spacing.xl};
  }
  ${mediaQuery[3]} {
    padding: 0;
  }
  ${LogoSide}, ${NavSide}, ${ProfileSide} {
    align-items: center;
    display: flex;
    height: 100%;
    a {
      color: ${tokens.color.contrastLight};
      font-weight: ${tokens.font.fontWeight.medium};
      text-decoration: none;
    }
  };
  ${LogoSide}, ${ProfileSide} {
    flex: 1;
  };
  ${NavSide} {
    display: none;
    ${mediaQuery[2]} {
      display: flex;
      justify-content: center;
      flex: 2;
      text-transform: uppercase;
      ${NavLinkWrapper} {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 100%;
        a {
          padding: 0 ${tokens.spacing.max};
          line-height: ${tokens.navHeight.xl};
        }
      }
    }
  };
  ${ProfileSide} {
    display: none;
    ${mediaQuery[2]} {
      display: flex;
      justify-content: end;
    }
  };
`
const LogoLink = styled(Link)`
  pointer-events: ${props => 
    props.active && `none`
  };
  display: flex;
  img {
    height: 36px;
    user-select: none;
    ${mediaQueries({
      height: ["38px", "42px", "46px", "50px"]
    })}
  };
`
const ProfileLink = styled(Link)`
  height: 24px;
  margin: 0 ${tokens.spacing.md};
  position: relative;
`
const IconContainer = styled.div`
  height: ${tokens.font.fontSize.lg};
`
const Avatar = styled.img`
  height: 100%;
  width: 100%;
`
const LoginLink = styled(Link)`
  display: none;
  ${mediaQuery[2]} {
    display: initial;
    padding: ${tokens.spacing.md} ${tokens.spacing.xxl};
    transition: opacity ease 0.25s;
    &:hover {
      opacity: 0.8;
      transition: opacity ease 0.25s;
    }
  }
`

const MenuButton = styled.div`
  margin-left: ${tokens.spacing.md};
  padding: ${tokens.spacing.sm};
  cursor: pointer;
  ${mediaQuery[1]} {
    margin-left: ${tokens.spacing.xl};
  }
  ${mediaQuery[2]} {
    display: none;
  }
`

const MobileSide = styled.div`
  align-items: center;
  display: flex;
  padding: ${tokens.spacing.sm};
  ${mediaQuery[2]} {
    display: none;
  }
`

const navLinksItems = [
  {link: "/welcome", label: "Home", delay: 0},
  {link: "/team", label: "The Team", delay: 0},
  {link: "/shop", label: "Shop", delay: 0},
]

export default function Navbar() {
  const user = useSelector(state => state.user)
  const minimized = useSelector(state => state.modals.mobileNavMenu);
  const dispatch = useDispatch();
  const location = useLocation();
  const [hovered, setHovered] = useState("");
  const [active, setActive] = useState(location.pathname);
  const [cartActive, setCartActive] = useState(
    !minimized ? location.pathname === "/cart" : false
  )
  
  const handleOpenMenu = () => {
    dispatch(openMobileNavMenu())
  }
  
  useEffect(() => {
    if(minimized && location.pathname === "/cart") {
      const timer = setTimeout(() => {
        setCartActive(true);
      }, 105)
      return () => clearTimeout(timer);
    }
  }, [location.pathname, minimized]);
  
  return (
    <Nav>
      <LogoSide>
        <NavLinkWrapper>
          <LogoLink
            active={location.pathname === "/welcome" ? 1 : undefined}
            to="/welcome"
          >
            <img
              alt="nutritiv logo"
              src="/logo.png"
            />
          </LogoLink>
        </NavLinkWrapper>
      </LogoSide>
      
      <NavSide>
        {navLinksItems.map(item => (
          <NavLinkWrapper
            active={location.pathname === item.link ? 1 : undefined}
            key={item.link}
            onClick={() => setActive(item.link)}
            onMouseEnter={() => setHovered(item.link)}
            onMouseLeave={() => setHovered(null)}
          >
            <DelayLink
              active={location.pathname === item.link ? 1 : undefined}
              delay={item.delay}
              label={item.label}
              replace={false}
              to={item.link}
              smooth={true}
            />
            <AnimatePresence>
              {hovered === item.link && (
                <motion.div
                  transition={{
                    layout: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                    opacity: {
                      duration: 0.15
                    }
                  }}
                  layoutId="navside-highlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: tokens.color.transparentLight,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: 0,
                  }}
                />
              )}
              {active === item.link && (
                <motion.div
                  key="navside-underline"
                  layoutId='navside-underline'
                  transition={{
                    layout: {
                      duration: 0.2,
                      ease: "easeOut",
                    }
                  }}
                  style={{
                    background: tokens.color.accentStrong,
                    position: "absolute",
                    left: 0,
                    bottom: "-2px",
                    right: 0,
                    height: "2px",
                    width: "100%",
                    zIndex: 0,
                  }}
                />
              )}
            </AnimatePresence>
          </NavLinkWrapper>
        ))}
      </NavSide>
      
      <ProfileSide>
        {user.loggedIn ? (
          <>
            <ProfileLink 
              active={location.pathname === "/shop" ? 1 : undefined}
              to="/shop"
            >
              <IconContainer>
                <Icon
                  name="search"
                  color={tokens.color.contrastLight}
                  filled={location.pathname === "/shop"}
                  resizeDefault="0 -1 25 25"
                  strokeWidth={2}
                />
              </IconContainer>
            </ProfileLink>
            <ProfileLink
              active={location.pathname === "/chat" ? 1 : undefined}
              to="/chat"
            >
              <IconContainer>
                <Icon
                  name="chat"
                  color={tokens.color.contrastLight}
                  filled={location.pathname === "/chat"}
                  strokeWidth={2}
                />
              </IconContainer>
            </ProfileLink>
            <ProfileLink to={'/cart'}>
              <IconContainer>
                <Icon
                  name="cart"
                  color={tokens.color.contrastLight}
                  filled={location.pathname === "/cart"}
                  resizeDefault="0 -2 26 26"
                  resizeFilled="0 -2 22 22"
                  strokeWidth={1.5}
                />
              </IconContainer>
              {user?.cartQuantity > 0 && (
                <IconContainer
                  css={css`
                    position: absolute;
                    top: -5px;
                    right: -12px;
                  `}
                >
                  <Icon
                    name="counter"
                    color={tokens.color.accentStrong}
                    textColor={tokens.color.contrastDark}
                    filled
                    height={"90%"}
                    width={"90%"}
                    count={user.cartQuantity}
                  />
                </IconContainer>
              )}
            </ProfileLink>
            <ProfileLink
              active={location.pathname === "/profile" ? 1 : undefined}
              to="/profile"
            >
              <Avatar
                alt="avatar"
                src={user.avatar}
              />
            </ProfileLink>
            <Logout />
          </>
        ) : (
          <>
            <LoginLink 
              to="/login"
              whilehover={{
                opacity: 0.8
              }}
              transition={{
                duration: 0.25
              }}
            >
              Login
            </LoginLink>
            <NutriButton
              wave={1}
              type="filled"
              label="Register"
              rounded={tokens.borderRadius.sm} 
              to="/register"
            >
              Register
            </NutriButton>
          </>
        )}
      </ProfileSide>
      
      <MobileSide>
        {user.loggedIn === false ? (
          <NutriButton
            wave={1}
            type="filled"
            label="Register"
            rounded={tokens.borderRadius.sm} 
            to="/register"
          >
            Register
          </NutriButton>
        ) : (
          <ProfileLink to="/cart">
            <IconContainer>
              <Icon
                name="cart"
                color={tokens.color.contrastLight}
                // filled={location.pathname === "/cart"}
                filled={cartActive}
                strokeWidth={2}
              />
            </IconContainer>
            {user?.cartQuantity > 0 && (
              <IconContainer
                css={css`
                  position: absolute;
                  top: -5px;
                  right: -12px;
                `}
              >
                <Icon
                  name="counter"
                  color={tokens.color.accentStrong}
                  textColor={tokens.color.contrastDark}
                  count={user.cartQuantity}
                  filled
                  height={"90%"}
                  width={"90%"}
                />
              </IconContainer>
            )}
          </ProfileLink>
        )}
        <MenuButton onClick={() => handleOpenMenu()}>
          <IconContainer>
            <Icon
              name="menu"
              color={tokens.color.contrastLight}
              strokeWidth={2}
            />
          </IconContainer>
        </MenuButton>
      </MobileSide>
    </Nav>
  )
}
