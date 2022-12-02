/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { mediaQueries, tokens } from '../../Helpers/styleTokens'
import { LogoLink, navLinksItems } from '../Header/Navbar'
import { Icon } from '../Icons/Icon'
import { HoverableLinks } from '../PagesWrapper'

const NavLink = styled(Link)`
  color: ${props => props.active ? tokens.color.secondary : tokens.color.contrastLight};
`
export const currentTime = new Date();
export const currentYear = currentTime.getFullYear()

export const Footer = () => {
  const location = useLocation();
  
  return (
    <footer 
      css={css`
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        text-align: center;
      `}
    >
      <div css={css`margin: ${tokens.spacing.xxl};`}>
        {location.pathname === "/welcome" && (
          <div
            css={css`
              align-items: center;
              display: flex;
              justify-content: space-between;
              margin-bottom: ${tokens.spacing.lg};
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
                  css={css`
                    margin: 0 ${tokens.spacing.lg};
                    font-weight: ${tokens.font.fontWeight.medium};
                    letter-spacing: 1px;
                    text-decoration: none;
                    text-transform: uppercase;
                    transition: all ease .2s;
                    &:hover {
                      transition: all ease .2s;
                      opacity: ${item.link === location.pathname ? 1 : 0.65};
                    }
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
                  ${HoverableLinks}
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
              <a css={css`${HoverableLinks}`} href="mailto:contact.nutritiv@gmail.com">
                <Icon
                  name="mail" 
                  color={tokens.color.contrastLight}
                  filled
                  height={"28px"}
                  width={"28px"}
                />
              </a>
              <a css={css`${HoverableLinks}`} href="https://goo.gl/maps/3jHqjPTChCAevUyW9">
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
        )}
        
        <div 
          css={css`
            font-size: ${tokens.font.fontSize.sm};
            margin-bottom: 4px;
          `}
        >
          {currentYear} by&nbsp;
          <a css={css`${HoverableLinks}`} href="https://discord.gg/shj48F8XBd" rel="noreferrer" target="_blank">
            Kiwi Labs
          </a>
          , All Rights Reserved.&nbsp;
          <Link 
            css={css`${HoverableLinks}`}
            to="/releases"
          >
            Releases
          </Link>
          .
          {/* <TextLink href="https://discord.gg/shj48F8XBd" target="_blank">Hire us</TextLink>. */}
        </div>
        <div css={css`font-size: ${tokens.font.fontSize.xs};`}>
          This site is protected by reCAPTCHA and the Google&nbsp;
          <a css={css`${HoverableLinks}`} href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">
            Privacy Policy&nbsp;
          </a> 
          and&nbsp;
          <a css={css`${HoverableLinks}`} href="https://policies.google.com/terms" rel="noreferrer" target="_blank">
            Terms of Service&nbsp;
          </a> 
          apply.&nbsp;
        </div>
      </div>
    </footer>
  )
}