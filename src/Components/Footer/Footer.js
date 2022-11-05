/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { mediaQueries, tokens } from '../../Helpers/styleTokens'
import { LogoLink, navLinksItems } from '../Header/Navbar'
import { Icon } from '../Icons/Icon'

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
      <div css={css`margin: ${tokens.spacing.xxl};`}>
        <div
          css={css`
            align-items: center;
            display: flex;
            justify-content: space-between;
            ${mediaQueries({
              flexDirection: ["column", "column", "row", "row"],
            })}
          `}
        >
          <LogoLink 
            style={{ 
              display: "flex",
              minWidth: "180px", 
              justifyContent: "center",
            }}
          >
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
              margin: ${tokens.spacing.xxl} auto;
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
              justify-content: center;
              min-width: 180px;
              > a {
                margin: 0 ${tokens.spacing.sm};
              }
            `}
          >
            <a 
              href="https://github.com/Monstarrrr/nutritiv-fe"
              css={css`
                align-items: center;
                display: flex; 
              `}
            >
              <Icon
                name="github" 
                color={tokens.color.contrastLight}
                filled
                height={"28px"}
                width={"28px"}
              />
            </a>
            <a href="mailto:admin@nutritiv.app">
              <Icon
                name="mail" 
                color={tokens.color.contrastLight}
                filled
                height={"28px"}
                width={"28px"}
              />
            </a>
            <a href="https://goo.gl/maps/3jHqjPTChCAevUyW9">
              <Icon
                name="location" 
                color={tokens.color.contrastLight}
                filled
                height={"28px"}
                width={"28px"}
              />
            </a>
          </div>
        </div>
        
        <div 
          css={css`
            font-size: ${tokens.font.fontSize.sm};
            margin-bottom: ${tokens.spacing.sm};
            margin-top: ${tokens.spacing.xxl};
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
      </div>
    </footer>
  )
}