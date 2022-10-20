/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tokens } from '../../Helpers/styleTokens'
import { LogoLink, navLinksItems } from '../Header/Navbar'
import { NutriButton } from '../NutriButton'

const NavLink = styled(Link)`
  color: ${props => props.active ? tokens.color.secondary : tokens.color.contrastLight};
`

export const Footer = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  return (
    <footer 
      css={css`
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        text-align: center;
        user-select: none;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin: 50px 0;
        `}
      >
        <LogoLink style={{ minWidth: "180px" }}>
          <img 
            alt="nutritiv logo"
            src="/logo.png"
          />
        </LogoLink>
        <ul
          css={css`
            display: flex;
            list-style-type: none;
            padding: 0;
          `}
        >
          {navLinksItems.map(item => (
            <NavLink
              active={location.pathname === item.link ? 1 : undefined}
              key={item.link}
              onClick={() => setActive(item.link)}
              css={css`
                margin: 0 ${tokens.spacing.lg};
                font-weight: ${tokens.font.fontWeight.medium};
                letter-spacing: 1px;
                text-decoration: none;
                text-transform: uppercase;
              `}
              to={item.link}
            >
              {item.label}
            </NavLink>
          ))}
        </ul>
        <div 
          css={css`
            display: flex;
            justify-content: space-between;
            min-width: 180px;
          `}
        >
          <NutriButton label="test"/>
        </div>
      </div>
      <div 
        css={css`
          font-size: ${tokens.font.fontSize.sm};
          margin-bottom: ${tokens.spacing.sm};
        `}
      >
        2022 by Kiwi Labs, All Rights Reserved. <a>Hire us</a>.
      </div>
      <div
        css={css`
          font-size: ${tokens.font.fontSize.xs};
          margin-bottom: ${tokens.spacing.lg};
          & > a {
            color: ${tokens.color.accentStrong};
            text-decoration: none;
          }
        `}
      >
        This site is protected by reCAPTCHA and the Google&nbsp;
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp;
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.&nbsp;
        <Link to="/releases">
          Releases
        </Link>
        .
      </div>
    </footer>
  )
}