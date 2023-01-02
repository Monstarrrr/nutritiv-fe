/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'
import { baseURL } from '../../Api/nutritivApi';
import { tokens } from '../../Helpers/styleTokens';

export const OAuth = ({ provider }) => {
  
  const handleLogin = (e) => {
    e.preventDefault();
    window.open(`
      ${baseURL}/auth/${provider}`, 
      "_self"
    )
  }
  
  return (
    // <div className={`oAuth-${provider}`}>
      <form 
        css={css`
          margin-bottom: ${tokens.spacing.lg};
          width: 100%;
        `}
        onSubmit={handleLogin}
      >
        <input 
          css={css`
            background: ${tokens.color.primary};
            border: 2px solid ${tokens.color.accentStrong};
            border-radius: ${tokens.borderRadius.sm};
            color: ${tokens.color.accentStrong};
            cursor: pointer;
            font-weight: ${tokens.font.fontWeight.medium};
            padding: ${tokens.spacing.sm} ${tokens.spacing.md};
            transition: all ease .2s;
            width: 100%;
            &:hover {
              box-shadow: 0 0 6px ${tokens.color.accentStrong};
              transition: all ease .2s;
            }
          `}
          type="submit" 
          value={`Sign in with ${provider.toUpperCase()}`} 
        />
      </form>
    // </div>
  )
}