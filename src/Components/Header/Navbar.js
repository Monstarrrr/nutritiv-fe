/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { tokens } from '../../Helpers/styleTokens';
import { Logout } from '../Authentication/Logout';
import styled from '@emotion/styled';

export default function Navbar() {
  const user = useSelector(state => state.user)
  const location = useLocation();
  const navigate = useNavigate();
  
  // Styles
  const LogoSide = styled.div``
  const NavSide = styled.div``
  const ProfileSide = styled.div``
  const Nav = styled.nav`
    align-items: center;
    border-bottom: ${tokens.border.sm};
    border-color: ${tokens.color.transparentLight};
    display: flex;
    height: 120px;
    justify-content: space-between;
    left: 0;
    max-width: ${tokens.maxWidth.xlarge};
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    ${LogoSide} {};
    ${NavSide} {};
    ${ProfileSide} {};
  `
  const LinkWrapper = styled.div`
    cursor: pointer;
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
  const NavLink = styled(({active, ...props }) => <Link {...props} />)`
    font-size: ${tokens.font.fontSize.sm};
    pointer-events: ${props => 
      props.active && `none`
    };
    user-select: none;
  `
  
  return (
    <Nav>
      <LogoSide>
        <LinkWrapper>
          <LogoLink
            active={location.pathname === "/welcome"}
            to={"/welcome"}
          >
            <img
              alt="nutritiv logo"
              src="/logo.png"
            />
          </LogoLink>
        </LinkWrapper>
      </LogoSide>
      
      <NavSide>
        <LinkWrapper>
          <NavLink 
            active={location.pathname === "/welcome"}
            to="/welcome"
          >
            HOME
          </NavLink>
        </LinkWrapper>
        
        <LinkWrapper>
          <NavLink 
            active={location.pathname === "/products"}
            to="/products"
          >
            PRODUCTS
          </NavLink>
        </LinkWrapper>
        
        <LinkWrapper>
          <NavLink 
            active={location.pathname === "/chat"}
            to="/chat"
            >
            CHATS
          </NavLink>
        </LinkWrapper>
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
              <Link to="/register">REGISTER</Link>
              <Link to="/login">LOGIN</Link>
            </>
          )
        }
      </ProfileSide>
    </Nav>
  )
}
