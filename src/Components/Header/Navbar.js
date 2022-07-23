/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { tokens } from '../../Helpers/styleTokens';
import { Logout } from '../Authentication/Logout';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { DelayLink } from '../DelayLink';

export default function Navbar() {
  const user = useSelector(state => state.user)
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("");
  const [highlighted, setHighlighted] = useState(location.pathname)
  
  const navLinksItems = [
    {link: "/welcome", label: "Home"},
    {link: "/products", label: "Products"},
    {link: "/chat", label: "Chats"}
  ]
  
  useEffect(() => {
    setHighlighted(location.pathname)
  }, [location.pathname]);

  // Styles
  const LogoSide = styled.div``
  const NavSide = styled.div``
  const ProfileSide = styled.div``
  const LinkWrapper = styled(({active, ...props }) => <div {...props} />)`
    cursor: pointer;
    position: relative;

  `
  const Nav = styled.nav`
    align-items: center;
    border-bottom: ${tokens.border.sm};
    border-color: ${tokens.color.transparentLight};
    display: flex;
    height: ${tokens.navHeight};
    justify-content: space-between;
    left: 0;
    max-width: ${tokens.maxWidth.xl};
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    ${LogoSide}, ${NavSide}, ${ProfileSide} {
      align-items: center;
      display: flex;
      height: 100%;
      a {
        color: ${tokens.color.contrastLight};
        font-weight: ${tokens.font.fontWeight.bold};
        text-decoration: none;
      }
    };
    ${LogoSide}, ${ProfileSide} {
      flex: 1;
    };
    ${NavSide} {
      justify-content: center;
      flex: 2;
      text-transform: uppercase;
      ${LinkWrapper} {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 100%;
        a {
          padding: 0 ${tokens.spacing.xxl};
          line-height: ${tokens.navHeight};
        }
      }
    };
    ${ProfileSide} {
      justify-content: end;
    };
  `
  const LogoLink = styled(({active, ...props }) => <Link {...props} />)`
    pointer-events: ${props => 
      props.active && `none`
    };
    img {
      height: 50px;
      user-select: none;
    };
  `
  const DelayedLink = styled(({active, ...props }) => <DelayLink {...props} />)`
    font-size: ${tokens.font.fontSize.sm};
    pointer-events: ${props => 
      props.active && `none`
    };
    user-select: none;
    z-index: 1;
  `

  return (
    <Nav>
      <LogoSide>
        <LinkWrapper>
          <LogoLink
            active={location.pathname === "/welcome"}
            to="/welcome"
          >
            <img
              alt="nutritiv logo"
              src="/logo.png"
            />
          </LogoLink>
        </LinkWrapper>
      </LogoSide>
      
      <NavSide>
        <AnimatePresence>
          {navLinksItems.map((item, i) => (
            <LinkWrapper 
              key={i}
              onMouseEnter={() => setHovered(item.link)}
              onMouseLeave={() => {
                setHovered("")
                setHighlighted(location.pathname)
              }}
            >
              <DelayedLink
                active={location.pathname === item.link}
                delay={
                  location.pathname === navLinksItems[0].link ? 200 : 0
                }
                label={item.label}
                replace={false}
                to={item.link}
              />
              {
                hovered === item.link && (
                  <motion.div
                    key="navside-hover"
                    layoutId="navside-hover"
                    exit={{ opacity: 0 }}
                    transition={{
                      layout: {
                        duration: 0.2,
                        ease: "easeOut",
                      }
                    }}
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
                )
              }
              {
                highlighted === item.link && (
                  <motion.div
                    key="navside-highlight"
                    layoutId='navside-highlight'
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
                )
              }
            </LinkWrapper>
          ))}
        </AnimatePresence>
      </NavSide>

      <ProfileSide>
        {
          user.loggedIn ? (
            <>
              <Link to="/profile">
                { user.username }
              </Link>
              <span>----</span>
              <img
                alt="avatar"
                style={{
                  maxWidth: "30px",
                }}
                src={user.avatar}
              />
              <span>----</span>
              <button onClick={() => navigate('/cart')}>
                Cart 
                {
                  user?.cartQuantity > 0 && (
                    <span>({user.cartQuantity})</span>
                  )
                }
              </button>
              <span>----</span>
              <Logout />
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )
        }
      </ProfileSide>
    </Nav>
  )
}
