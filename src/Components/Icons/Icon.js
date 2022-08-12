import styled from '@emotion/styled';
import React from 'react'
import { tokens } from '../../Helpers/styleTokens';

const Count = styled.span`
  color: ${props => props.textColor};
  font-size: ${tokens.font.fontSize.xs};
  left: -1px;
  position: absolute;
  top: 4px;
  text-align: center;
  width: 100%;
`

const viewBox = [
  {
    cart:    [{default: "0 0 24 24"},  {filled: "1 0 19 19"}],
    shop:    [{default: "1 0 24 24"},  {filled: "1 0 19 19"}],
    chat:    [{default: "0 -1 26 26"}, {filled: "0 -1 22 22"}],
    menu:    [{default: "0 0 22 22"}],
    close:   [{default: "0 0 24 24"}],
    search:  [{default: "0 -2 28 28"}, {filled: "1 1 18 18"}],
    home:    [{default: "0 0 25 25"},  {filled: "0 0 21 21"}],
    user:    [{default: "0 -1 27 27"}, {filled: "0 -1 22 22"}],
    users:   [{default: "-1 -1 27 27"}, {filled: "-1 -1 23 23"}],
    tag:     [{default: "0 -2 27 27"}, {filled: "0 -2 23 23"}],
    login:   [{default: "0 -1 26 26"}],
    exit:    [{default: "0 0 23 23"}],
    counter: [{default: "0 0 100 100"}, {filled: "0 0 100 100"}],
  },
]

export const Icon = (props) => {
  const { 
    name,
    filled,
    color,
    textColor,
    strokeWidth, 
    width, 
    height,
    resizeDefault,
    resizeFilled,
    count,
    style
  } = props;

  return (
    <>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill={filled ? color : "none"}
        viewBox={
          (resizeDefault && !filled) ? resizeDefault : (
            (resizeFilled && filled) ? resizeFilled : (
              filled ? (
                viewBox[0][`${name}`][1].filled
              ) : (
                viewBox[0][`${name}`][0].default
              )
            )
          )
        }
        stroke={color} 
        strokeWidth={filled ? 0 : strokeWidth}
        height={height || "100%"}
        width={width || "100%"}
        style={style}
      >
        {name === "shop" && (
          filled ? (
            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
          ) : (
            <path strokeLinecap="round"  strokeLinejoin="round"  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          )
        )}
        {name === "cart" && (
          filled ? (
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          )
        )}
        {name === "chat" && (
          filled ? (
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          )
        )}
        {name === "menu" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />    
        )}
        {name === "close" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        )}
        {name === "search" && (
          filled ? (
            <>
              <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
            </>
          ) : (
            <g transform="scale(-1,1) translate(-24, 0)">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          ) 
        )}
        {name === "home" && (
          filled ? (
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          )
        )}
        {name === "user" && (
          filled ? (
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          )
        )}
        {name === "users" && (
          filled ? (
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />  
          )
        )}
        {name === "tag" && (
          filled ? (
            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          )
        )}
        {name === "login" && (
          <g transform="scale(-1,1) translate(-23, 0)">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </g>
        )}
        {name === "exit" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        )}
        {name === "counter" && (
          <circle cx="50" cy="50" r="50" />
        )}
      </svg>
      {name === "counter" && (
        <Count textColor={textColor}>
          {count}
        </Count>
      )}
    </>
  )
}