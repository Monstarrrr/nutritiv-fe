import styled from '@emotion/styled';
import React from 'react'
import { tokens } from '../../Helpers/styleTokens';
import { motion } from 'framer-motion';

const Count = styled.span`
  color: ${props => props.textColor};
  font-size: ${tokens.font.fontSize.xs};
  left: -1px;
  position: absolute;
  top: 4px;
  text-align: center;
  width: 100%;
`

const defaultViewBoxes = [
  {
    cart:         [{default: "0 0 24 24"},  {filled: "1 0 19 19"}],
    shop:         [{default: "1 0 24 24"},  {filled: "1 0 19 19"}],
    chat:         [{default: "0 -1 26 26"}, {filled: "0 -1 22 22"}],
    menu:         [{default: "0 0 22 22"}],
    close:        [{default: "0 0 24 24"}],
    search:       [{default: "0 -2 28 28"}, {filled: "1 1 18 18"}],
    home:         [{default: "0 0 25 25"},  {filled: "0 0 21 21"}],
    user:         [{default: "0 -1 27 27"}, {filled: "0 -1 22 22"}],
    users:        [{default: "-1 -1 27 27"}, {filled: "-1 -1 23 23"}],
    tag:          [{default: "0 -2 27 27"}, {filled: "0 -2 23 23"}],
    login:        [{default: "0 -1 26 26"}],
    exit:         [{default: "0 0 23 23"}],
    counter:      [{default: "0 0 100 100"}, {filled: "0 0 100 100"}],
    arrowDown:    [{default: "0 0 100 100"}],
    wave:         [{default: "0 0 100 100"}, {filled: "0 0 100 100"}],
    beaker:       [{default: "0 0 24 24"}, {filled: "0 0 24 24"}],
    star:         [{default: "0 0 24 24"}, {filled: "0 0 24 24"}],
    brain:        [{default: "0 0 100 100"}, {filled: "0 0 100 100"}],
    arrowsUp:     [{default: "0 0 100 100"}, {filled: "0 0 100 100"}],
    armor:        [{default: "0 0 100 100"}, {filled: "0 0 100 100"}],
    plusSign:     [{default: "0 0 100 100"}, {filled: "0 0 100 100"}],
  },
]

const ConditionalClipPath = ({ condition, wrapper, children }) => (
  condition ? wrapper(children) : children
)

export const Icon = (props) => {
  const { 
    name, // required
    color, // required
    strokeWidth, // required if != filled
    count,
    filled,
    height,
    hovered,
    isClipPath,
    resizeDefault,
    resizeFilled,
    style,
    textColor,
    width, 
  } = props;
  
  const pathVariant = {
    notHovered: {
      pathLength: 0,
    },
    hovered: {
      pathLength: 1,
      transition: {
        ease: "easeInOut",
      }
    }
  }

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
                defaultViewBoxes[0][`${name}`][1].filled
              ) : (
                defaultViewBoxes[0][`${name}`][0].default
              )
            )
          )
        }
        stroke={color || tokens.color.contrastLight} 
        strokeWidth={strokeWidth ? strokeWidth : 0}
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
        {name === "arrowDown" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        )}
        {name === "wave" && (
          <>
            <motion.path
              variants={pathVariant}
              animate={hovered ? "hovered" : "notHovered"}
              d="M16.5137234,24.1536064c5.3276005,0,10.6513004-1.8349991,16.0449009-5.5030003
              c9.075695-6.1742992,20.5312004-6.1722994,29.8934975,0.0079002c0.4623985,0.3031998,1.0820999,0.1742992,1.3842964-0.291399
              c0.3027039-0.465601,0.1734085-1.0907001-0.2885933-1.3959007c-10.0488052-6.6311007-22.3515053-6.6281004-32.1084023,0.0079002
              c-10.035099,6.8260002-19.8099995,6.8269997-29.8813-0.0010014c-0.4585-0.3111-1.0796-0.1869984-1.3881999,0.2747002
              c-0.3081,0.4616013-0.186,1.0876999,0.272,1.3987999C5.854023,22.3196068,11.185523,24.1536064,16.5137234,24.1536064z"
            />
            <motion.path
              variants={pathVariant}
              animate={hovered ? "hovered" : "notHovered"}
              d="M63.5478249,30.8939056c-10.0498047-6.6310997-22.3525047-6.6280994-32.1084023,0.0079002
              c-10.0361004,6.8279991-19.8110008,6.8269997-29.8813-0.0009995c-0.4585-0.3111-1.0796-0.1879997-1.3877,0.2747002
              c-0.3086,0.4617004-0.1865,1.0877991,0.2715,1.3987999c5.4116001,3.6679993,10.7426996,5.5029984,16.0708008,5.5029984
              c5.3275986-0.0009995,10.6513996-1.8349991,16.0459003-5.5038986c9.0746956-6.1753006,20.5302963-6.1714001,29.8934975,0.0078011
              c0.4623985,0.3031998,1.0825996,0.1742973,1.3848-0.2914009C64.139122,31.8242073,64.0098267,31.1991062,63.5478249,30.8939056z"
            />
            <motion.path
              variants={pathVariant}
              animate={hovered ? "hovered" : "notHovered"}
              d="M63.5478249,44.8166046c-10.0498047-6.629097-22.3520012-6.6260986-32.1084023,0.0079002
              c-10.0340996,6.8280029-19.8080997,6.8300018-29.8813-0.0009995c-0.4585-0.3110008-1.0796-0.1870003-1.3877,0.2747002
              c-0.3086,0.4617004-0.1865,1.0877991,0.2715,1.3988991c5.4120998,3.6689034,10.7440996,5.5039024,16.0718002,5.502903
              c5.3276005,0,10.6513004-1.8350029,16.0444012-5.5039024c9.0761948-6.1733971,20.5307961-6.1713982,29.8939972,0.0078011
              c0.4623985,0.3031998,1.0825996,0.1743011,1.3848-0.2912979C64.139122,45.7469063,64.0098267,45.1218071,63.5478249,44.8166046z"
            />
          </>
        )}
        {name === "beaker" && (
          filled ? (
            <path fillRule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clipRule="evenodd" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />          
          )
        )}
        {name === "star" && (
          filled ? (
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />            
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />            
          )
        )}
        {name === "brain" && (
          <g>
            <ConditionalClipPath
              condition={isClipPath}
              wrapper={children => (
                <clipPath id="svg-path-brain">{children}</clipPath>
              )}
            >
              <path d="M61.4,7c1.4,0.5,2.9,0.9,4.3,1.6c2.1,1.1,3.6,2.9,4.7,5c0.3,0.6,0.7,0.9,1.3,1.1c4,1.3,6.9,5.2,6.8,9.5
                c0,1,0.3,1.5,1.1,2c4.6,2.7,6.8,9,5,14.1c-0.2,0.5-0.1,0.8,0.3,1.2c3.6,3.5,4.5,7.8,3,12.5c-0.3,0.9-0.8,1.7-1.1,2.6
                c-0.1,0.3-0.2,0.8,0,1.1c2.9,4.6,2.2,10.4-1.4,14.2c-0.2,0.2-0.3,0.6-0.3,0.9c0.6,6.1-3.3,11.7-9.2,13.2c-0.6,0.1-1.2,0.3-1.7,0.3
                c-0.7,0-1.1,0.3-1.5,0.8c-3.2,4.5-7.6,6.5-13.1,5.7c-3.9-0.6-6.9-2.7-9.1-6c-0.2-0.3-0.4-0.6-0.7-1c-0.2,0.4-0.4,0.6-0.6,0.9
                c-2.8,4.2-6.7,6.5-11.8,6.3c-4.4-0.2-7.9-2.2-10.4-5.8c-0.4-0.6-0.8-0.8-1.6-0.9c-4.4-0.4-7.6-2.8-9.6-6.7
                c-1.1-2.1-1.5-4.4-1.3-6.8c0-0.3-0.1-0.6-0.3-0.9c-3.3-3.7-4.1-8.6-1.9-13c0.6-1.2,0.7-2,0.1-3.3c-2-4.3-1.8-8.6,1-12.5
                c0.4-0.6,0.9-1.1,1.5-1.6c0.3-0.3,0.4-0.5,0.3-1c-1.9-5.5,0.3-11.5,5.4-14.5c0.4-0.3,0.7-0.5,0.7-1.1c-0.3-4.6,2.8-8.9,7.2-10.2
                c0.3-0.1,0.5-0.3,0.7-0.5c1.9-3.8,4.9-6.2,9.1-7c0,0,0.1-0.1,0.1-0.1c1,0,1.9,0,2.9,0c0.2,0.1,0.4,0.1,0.5,0.2
                c2.4,0.5,4.4,1.6,6.1,3.3c0.7,0.7,1.3,1.6,2,2.4c0,0,0.1,0,0.1-0.1c0.1-0.1,0.2-0.3,0.3-0.4c1.3-1.9,2.9-3.4,5-4.3
                c1-0.5,2.1-0.7,3.1-1.1C59.5,7,60.5,7,61.4,7z M66.8,14.4c-1.5-2.5-4.7-4.2-7.3-3.9c-3.9,0.4-7.2,3.7-7.7,7.5
                c-0.1,0.9-0.1,1.8-0.2,2.7c0,3.9,0,7.8,0,11.5c1.1-0.2,2.2-0.5,3.3-0.6c1-0.1,1.7,0.6,1.8,1.5c0.1,0.9-0.6,1.7-1.6,1.8
                c-2.4,0.3-3.4,1.5-3.4,3.9c0,10.1,0,20.3,0,30.4c0,0.2,0,0.5,0,0.9c0.3-0.3,0.5-0.5,0.7-0.7c2.5-2.4,5.5-3.7,9-3.8
                c1.2,0,2,0.6,2.1,1.6c0,1-0.7,1.7-1.9,1.8c-0.6,0.1-1.3,0.1-1.9,0.3c-6.3,1.5-9.6,7.9-7.1,13.9c2.2,5.3,7.7,7.7,12.9,5.7
                c2.4-0.9,4.1-2.6,5.3-4.8c0.6-1.2,1.1-1.4,2.4-1.2c0.4,0,0.8,0.1,1.3,0c4.7-0.7,8.1-5.3,7.3-10.1c-0.2-1.2,0.1-2,1-2.9
                c2.8-2.7,3.4-7.2,1.3-10.1c-0.2,0.1-0.5,0.3-0.7,0.5c-1.9,1.3-3.9,2.1-6.2,2.1c-1.1,0-1.8-0.7-1.8-1.6c0-0.9,0.7-1.6,1.7-1.7
                c0.6-0.1,1.2-0.1,1.8-0.3c3.5-1,5.6-3.5,6.3-7c0.7-3.5-0.5-6.3-3.4-8.4c-1.2-0.9-1.4-1.5-0.8-2.8c1.7-3.5,1.1-6.8-1.3-9.7
                c-2.1-2.5-4.8-3.6-8.1-2.7c-3.5,1-6.1,4.4-6.4,8.4c-0.1,1.2-0.7,1.9-1.7,1.9c-1,0-1.7-0.8-1.7-2c0-4.7,3.2-9.3,7.5-11.1
                c1.9-0.8,3.8-1,5.9-0.7c-0.1-0.5-0.1-0.9-0.1-1.2c-0.4-3.3-3.9-5.9-7.2-5.5c-1.5,0.2-2.8,0.8-4,1.8c-1,0.8-2,0.8-2.6,0
                c-0.6-0.8-0.4-1.7,0.5-2.6C63.2,15.6,64.9,14.8,66.8,14.4z M48.3,32.2c0-0.1,0-0.4,0-0.6c0-4,0-7.9,0-11.9c0-3.7-1.7-6.6-5-8.4
                c-4.1-2.2-8.5,0.3-10.1,3.1c0.3,0.1,0.5,0.2,0.8,0.2c1.8,0.4,3.3,1.3,4.5,2.6c0.7,0.7,0.7,1.7,0.1,2.3c-0.6,0.7-1.5,0.8-2.3,0.2
                c-0.3-0.2-0.5-0.4-0.8-0.6c-2.1-1.6-4.5-1.9-6.9-0.8c-2.6,1.2-3.8,3.3-3.9,6.1c0.3,0,0.6,0,0.9,0c6.8-0.5,12.5,5.4,12.5,12
                c0,1.2-0.6,1.9-1.6,1.9c-1,0-1.7-0.7-1.7-1.8c-0.1-2.2-0.8-4.1-2.3-5.7c-2.2-2.4-4.8-3.5-8-2.7c-4.6,1.1-8.2,7.3-5.5,12.3
                c0.7,1.4,0.5,2-0.7,3c-0.8,0.6-1.5,1.3-2,2.1c-3.8,5.5,0,13.1,6.8,13.6c1.2,0.1,1.9,0.8,1.8,1.8c0,1-0.8,1.7-1.9,1.6
                c-1.4-0.2-2.7-0.5-4-0.9c-1-0.4-1.9-1-2.9-1.6c-0.1,0.1-0.1,0.1-0.2,0.2c-1.8,3.3-1.2,7.4,1.6,10c0.8,0.7,1.1,1.5,0.9,2.6
                c-0.2,1.3-0.2,2.7,0.2,3.9c1.1,4.1,5.2,7.1,8.8,6.4c0.7-0.1,1.3,0.2,1.7,0.8c0.2,0.4,0.4,0.7,0.6,1.1c2,3.2,5,5,8.8,4.9
                c6.2-0.2,11-6.6,9.6-12.6c-1.1-4.7-4.7-7.6-9.7-7.9c-1.2-0.1-1.9-0.7-1.8-1.7c0-1,0.8-1.6,1.9-1.6c3,0.1,5.7,1.1,8.1,2.9
                c0.5,0.4,1.1,0.9,1.7,1.5c0-0.3,0-0.4,0-0.5c0-10.3,0-20.6,0-30.9c0-2.2-1.2-3.4-3.4-3.7c-1-0.1-1.7-0.8-1.6-1.8
                c0.1-0.9,0.8-1.7,1.8-1.6C46.2,31.7,47.2,32,48.3,32.2z"/>
              <path class="st0" d="M65.5,48.2c0.6,2,2.2,3.3,4.6,3.5c0.8,0.1,1.3,0.4,1.7,1.1c0.5,1.1-0.4,2.3-1.7,2.3c-3.5,0-6.9-2.5-7.8-5.9
                c-0.2-0.7-0.4-1-1.2-1.1c-1.9-0.3-3.6-1.2-5.1-2.5c-0.9-0.7-1.1-1.7-0.5-2.5c0.6-0.8,1.6-0.9,2.5-0.2c1.5,1.1,3,1.8,4.9,2
                c2.9,0.3,6.3-1.3,7.8-3.9c0.8-1.3,1.2-2.7,1.3-4.3c0.1-1.2,0.8-1.8,1.8-1.8c1,0,1.6,0.8,1.6,1.9c0.1,5.1-3.8,9.9-8.8,11.2
                C66.1,48.1,65.8,48.1,65.5,48.2z"/>
              <path class="st0" d="M61.7,84.1c0.1-6.1,5.6-11.7,11.5-11.7c1.2,0,1.9,0.6,2,1.6c0,1-0.6,1.7-1.8,1.8c-4.6,0.3-7.9,3.9-8.2,8.8
                c-0.1,1-0.6,1.6-1.4,1.7c-0.8,0.1-1.6-0.3-1.9-1.1C61.8,84.8,61.8,84.4,61.7,84.1z"/>
              <path class="st0" d="M61.4,58.9c4.8,0.4,8.9,2.8,11.8,7.4c0.6,0.9,0.4,1.9-0.5,2.4c-0.8,0.5-1.7,0.3-2.3-0.6
                c-1-1.5-2.1-2.8-3.6-3.8c-1.9-1.3-4-1.9-6.3-2.1c-1.5-0.1-2.2-0.7-2.1-1.8C58.5,59.4,59.3,58.9,61.4,58.9z"/>
              <path class="st0" d="M60.1,22.7c0,0.9-0.8,1.7-1.7,1.7c-0.9,0-1.6-0.8-1.6-1.7c0-0.9,0.8-1.7,1.7-1.7C59.4,21,60.1,21.8,60.1,22.7z"/>
              <path class="st0" d="M34.6,48.2c-2.3-0.5-4.3-1.4-6-3c-2.4-2.3-3.7-5.1-3.7-8.4c0-1.1,0.6-1.8,1.6-1.9c1,0,1.7,0.6,1.8,1.7
                c0.3,3.8,2.1,6.5,5.8,7.8c2.7,1,5.3,0.5,7.7-1.2c0.4-0.3,0.8-0.6,1.2-0.7c0.8-0.3,1.5,0.1,1.9,0.8c0.4,0.7,0.3,1.5-0.4,2.1
                c-1.4,1.3-3.1,2.2-5,2.6c-0.9,0.2-1.4,0.5-1.7,1.5c-1,3.2-4.3,5.6-7.7,5.6c-1.1,0-1.8-0.6-1.9-1.6c0-1,0.6-1.7,1.7-1.8
                C32.3,51.4,33.8,50.3,34.6,48.2z"/>
              <path class="st0" d="M38.4,84.1c-0.1,0.9-0.3,1.6-1.1,2c-0.6,0.3-1.3,0.3-1.7-0.2c-0.4-0.4-0.6-1-0.7-1.5c-0.3-3.5-1.9-6.2-5-7.8
                c-1-0.5-2.2-0.7-3.3-0.9c-1.1-0.2-1.8-0.8-1.8-1.7c0-1,0.8-1.6,1.9-1.6c4.5,0,9,3.3,10.6,7.8C37.9,81.4,38.1,82.7,38.4,84.1z"/>
              <path class="st0" d="M41.6,60.6c0,0.9-0.7,1.6-1.7,1.7c-1.9,0.1-3.7,0.4-5.4,1.3c-1.8,1-3.3,2.2-4.4,3.9c-0.2,0.3-0.4,0.6-0.6,0.8
                c-0.6,0.8-1.5,0.9-2.3,0.4c-0.7-0.5-1-1.5-0.5-2.3c0.7-1,1.3-2,2.2-2.9c2.9-3,6.5-4.6,10.7-4.7C40.9,58.9,41.6,59.6,41.6,60.6z"/>
              <path class="st0" d="M43.3,22.7c0,0.9-0.8,1.7-1.7,1.7c-0.9,0-1.6-0.8-1.6-1.7c0-0.9,0.8-1.7,1.7-1.7C42.6,21,43.3,21.7,43.3,22.7z"/>
            </ConditionalClipPath>
          </g>
        )}
        {name === "arrowsUp" && (
          <g>
            <ConditionalClipPath
              condition={isClipPath}
              wrapper={children => (
                <clipPath id="svg-path-arrowsUp">{children}</clipPath>
              )}
            >
              <path d="M90,48.8c-0.5,0.8-1.3,1-2.2,0.9c-0.7-0.1-1.4,0-2.2,0c0,0.3,0,0.6,0,0.9c0,5.7,0,11.4,0,17.2
                c0,1.4-0.5,1.9-1.9,1.9c-4.8,0-9.5,0-14.3,0c-1.4,0-1.9-0.5-1.9-1.9c0-5.7,0-11.4,0-17.2c0-0.3,0-0.6,0-0.9c-0.9,0-1.8,0-2.7,0
                c-1.4,0-2.2-1.3-1.4-2.5c3.9-6.2,7.8-12.4,11.8-18.6c0.8-1.2,2.1-1.1,2.9,0.2c3.7,5.8,7.3,11.5,11,17.3c0.3,0.5,0.6,0.9,1,1.4
                C90,47.9,90,48.3,90,48.8z M70.6,66.5c4,0,7.9,0,11.9,0c0-0.3,0-0.5,0-0.7c0-5.8,0-11.6,0-17.5c0-1.2,0.6-1.8,1.8-1.8
                c0.4,0,0.8,0,1.3,0c-3-4.8-6-9.5-9-14.2c-3,4.8-6,9.4-9,14.2c0.5,0,0.8,0,1.1,0c1.5,0,2,0.5,2,2c0,4.3,0,8.7,0,13
                C70.6,63.2,70.6,64.8,70.6,66.5z"/>
              <path class="st0" d="M50.5,8.8c0.4,0.4,0.8,0.7,1.1,1.1c2.6,3.9,5.3,7.8,7.9,11.7c0.4,0.6,0.7,1.2,0.3,2c-0.4,0.7-1,0.9-1.8,0.8
                c-0.5,0-0.9,0-1.5,0c0,0.3,0,0.6,0,0.9c0,3.5,0,6.9,0,10.4c0,1.3-0.5,1.9-1.8,1.9c-3.1,0-6.3,0-9.4,0c-1.3,0-1.8-0.6-1.8-1.9
                c0-3.4,0-6.9,0-10.3c0-0.3,0-0.6,0-1c-0.6,0-1.2,0-1.8,0c-1.4,0-2.1-1.3-1.4-2.5c2.8-4.2,5.6-8.3,8.4-12.5
                c0.2-0.3,0.5-0.5,0.8-0.7C49.8,8.8,50.2,8.8,50.5,8.8z M46.6,34.4c2.3,0,4.6,0,6.9,0c0-0.3,0-0.6,0-0.9c0-3.5,0-7,0-10.4
                c0-1.1,0.5-1.7,1.6-1.7c0.1,0,0.2,0,0.3-0.1c-1.8-2.7-3.6-5.3-5.4-8c-1.9,2.7-3.6,5.4-5.4,8.1c1.6,0.1,2,0.6,2,2
                C46.6,27,46.6,30.6,46.6,34.4z"/>
              <path class="st0" d="M14.5,55c1.4,0,2.7,0,4,0c1.4,0,1.9,0.5,1.9,1.9c0,9.2,0,18.5,0,27.7c0,0.3,0,0.6,0,1c6.7,0,13.3,0,20,0
                c0-0.2,0-0.5,0-0.7c0-1.9,0-3.8,0-5.8c0-1.1,0.6-1.7,1.6-1.7c1,0,1.5,0.7,1.6,1.7c0,2.6,0,5.3,0,7.9c0,1.2-0.6,1.8-1.8,1.8
                c-7.5,0-15.1,0-22.6,0c-1.2,0-1.8-0.6-1.8-1.8c0-9.3,0-18.5,0-27.8c0-0.3,0-0.6,0-1c-1.8,0-3.5,0-5.2,0c-0.7,0-1.4-0.1-1.8-0.8
                c-0.4-0.7-0.1-1.3,0.3-2c6.1-9.6,12.2-19.1,18.3-28.7c0.9-1.4,2.1-1.4,3,0c6.1,9.6,12.2,19.2,18.4,28.8c0.4,0.6,0.6,1.2,0.2,1.9
                c-0.4,0.7-1,0.8-1.7,0.8c-1.7,0-3.4,0-5.3,0c0,0.3,0,0.5,0,0.8c0,1.9,0,3.8,0,5.8c0,1.1-0.6,1.7-1.6,1.7c-1,0-1.5-0.7-1.5-1.8
                c0-2.6,0-5.3,0-7.9c0-1.2,0.6-1.8,1.8-1.8c1.3,0,2.6,0,4.1,0c-5.3-8.3-10.5-16.5-15.9-24.8C25,38.5,19.8,46.7,14.5,55z"/>
              <path class="st0" d="M41.9,70.3c0.9,0,1.6,0.7,1.5,1.6c0,0.9-0.7,1.6-1.6,1.5c-0.9,0-1.5-0.7-1.5-1.6C40.3,71,41,70.3,41.9,70.3z"/>
            
            </ConditionalClipPath>
          </g>
        )}
        {name === "armor" && (
          <g>
            <ConditionalClipPath
              condition={isClipPath}
              wrapper={children => (
                <clipPath id="svg-path-armor">{children}</clipPath>
              )}
            >
              <path d="M94.7,38.8c-0.8,0.6-1.6,1.1-2.6,1.7c0.3,2,0.7,4.2,1.1,6.4c0.3,1.5-0.1,2.1-1.5,2.4
                c-3.9,0.9-7.9,1.8-11.8,2.6c-1,0.2-1.6-0.1-2-1.1c-0.2-0.7-0.4-1.4-0.7-2c-1.9,2.2-2.4,4.9-2.5,7.6c-0.2,3.9-0.6,7.7-1,11.5
                c-0.3,3.6-0.6,7.3-0.9,10.9c-0.2,2-0.4,3.9-0.5,5.9c-0.1,0.8-0.6,1.1-1.2,1.3c-4.3,1.6-8.5,3.2-12.8,4.7c-2.5,0.9-5,1.9-7.6,2.8
                c-0.4,0.2-1.1,0.2-1.5,0c-6.8-2.5-13.6-5-20.4-7.5c-0.7-0.3-1.2-0.7-1.3-1.6c-0.4-4.7-0.8-9.4-1.2-14.1c-0.4-5.1-0.9-10.1-1.3-15.2
                c0-0.5-0.1-1-0.1-1.5c0-2-1.4-3.4-2.2-5.3c-0.3,0.9-0.5,1.5-0.7,2.2c-0.4,1.1-0.9,1.4-2.1,1.2c-3.8-0.9-7.7-1.7-11.5-2.6
                c-1.6-0.4-2-0.9-1.7-2.5c0.4-2.2,0.7-4.3,1.1-6.5C7.4,40.1,7,40,6.5,39.7c-1.3-0.6-1.6-1.5-0.7-2.6c1.8-2.3,3.5-4.5,5.3-6.8
                c0.1-0.2,0.2-0.3,0.4-0.5c-0.4-0.5-0.9-1-1.3-1.5c-1.1-1.2-0.9-2,0.4-2.9c5.6-3.4,11.2-6.9,16.8-10.3c0.8-0.5,1.6-0.7,2.6-0.7
                c13.3,0,26.7,0,40,0c0.9,0,1.7,0.2,2.5,0.7c5.5,3.5,11.1,6.9,16.7,10.3c1.5,1,1.7,1.7,0.4,3c-0.4,0.5-0.8,0.9-1.2,1.4
                c2.1,2.7,4.2,5.3,6.2,8C94.7,38.1,94.7,38.5,94.7,38.8z M31.6,17.2c0.2,0.4,0.4,0.7,0.5,0.9c1.6,2.6,3.2,5.2,4.9,7.8
                c0.7,1.1,0.5,1.8-0.6,2.5c-1.2,0.7-2.3,1.4-3.5,2.1c-0.3,0.2-0.7,0.5-0.9,0.8c-1.8,2.1-3.7,4.2-5.5,6.3c-0.2,0.3-0.4,0.6-0.6,1
                c-0.6,2-1.2,3.9-1.8,5.9c-0.1,0.3-0.1,0.6,0,0.8c0.9,1.6,1.8,3.3,2.7,4.9c0.3-0.1,0.5-0.2,0.7-0.3c7.2-3.8,14.3-7.6,21.5-11.4
                c0.7-0.4,1.4-0.4,2.1,0c2.3,1.2,4.6,2.4,6.8,3.6c5.1,2.7,10.2,5.4,15.3,8.1c0.4-0.8,0.8-1.7,1.3-2.4c1.5-1.9,1.4-3.8,0.6-6
                c-0.9-2.6-2-4.8-3.8-6.8c-2.2-2.5-4.3-5-7.4-6.4c-0.1-0.1-0.3-0.1-0.4-0.2c-1.2-0.7-1.3-1.4-0.6-2.5c1.6-2.6,3.3-5.2,4.9-7.8
                c0.2-0.3,0.3-0.5,0.5-0.9c-1.1,0-2.1-0.1-3.1,0c-0.5,0-1,0.2-1.4,0.5c-3.4,2.6-6.6,5.4-10.1,7.9c-1.9,1.3-2.9,2.8-2.4,5.1
                c0,0.1,0,0.2,0,0.3c0,0.9-0.6,1.5-1.4,1.5c-0.8,0-1.3-0.6-1.4-1.5c0-0.8,0-1.7,0-2.5c0-0.6-0.2-1-0.7-1.4c-4-3.2-8-6.4-12-9.6
                c-0.2-0.2-0.4-0.3-0.7-0.3C34.1,17.1,32.9,17.2,31.6,17.2z M62.6,62.9C62.3,63,62.1,63,62,63.1c-3.7,1.4-7.4,2.8-11.1,4.1
                c-0.5,0.2-1.2,0.2-1.7,0c-2.2-0.8-4.4-1.6-6.6-2.4c-1.7-0.6-3.3-1.2-5.1-1.9c0,3.7,0,7.3,0,10.9c4.1,1.5,8.1,3,12.2,4.5
                c0.3,0.1,0.7,0,1-0.1c2-0.7,4-1.5,6-2.2c2-0.7,3.9-1.5,5.9-2.2C62.6,70.2,62.6,66.6,62.6,62.9z M62.6,49c-0.3,0.1-0.5,0.1-0.7,0.2
                c-3.7,1.4-7.3,2.8-11,4.1c-0.5,0.2-1.3,0.2-1.8,0c-1.5-0.5-2.9-1.1-4.4-1.6c-2.4-0.9-4.8-1.8-7.3-2.7c0,3.6,0,7.1,0,10.5
                c0,0.2,0.3,0.5,0.6,0.6c3.8,1.4,7.6,2.8,11.4,4.2c0.3,0.1,0.7,0.2,1,0.1c3.9-1.4,7.8-2.8,11.7-4.3c0.2-0.1,0.5-0.5,0.5-0.7
                c0.1-1.1,0-2.2,0-3.2C62.6,53.7,62.6,51.4,62.6,49z M37.5,76.9c0,3.2,0,6.4,0,9.5c3.9,1.5,7.9,2.9,11.8,4.4
                c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.7,0,1.1-0.2c3-1.1,6-2.2,9-3.3c0.9-0.3,2.2-0.5,2.7-1.1c0.5-0.7,0.2-2,0.2-3c0-2.1,0-4.3,0-6.5
                C62.3,77,62.1,77,62,77.1c-3.7,1.4-7.4,2.8-11.1,4.1c-0.5,0.2-1.2,0.2-1.7,0c-1.8-0.6-3.5-1.3-5.2-1.9
                C41.8,78.5,39.7,77.7,37.5,76.9z M34.6,85.3c0-12.1,0-24,0-36.1c-2.2,1.2-4.3,2.2-6.4,3.4c-0.2,0.1-0.4,0.6-0.4,0.8
                c0.2,3.1,0.5,6.3,0.8,9.4c0.3,3.8,0.7,7.6,1,11.4c0.3,3,0.5,5.9,0.7,8.9c0,0.3,0.1,0.7,0.3,0.7C31.9,84.4,33.2,84.8,34.6,85.3z
                M65.4,85.3c1.3-0.5,2.4-0.9,3.6-1.3c0.5-0.2,0.7-0.5,0.7-0.9c0.2-3,0.5-5.9,0.7-8.9c0.3-3.8,0.7-7.6,1-11.4
                c0.3-3.1,0.5-6.1,0.8-9.2c0.1-0.6-0.2-0.9-0.7-1.2c-1.8-0.9-3.6-1.9-5.4-2.8c-0.2-0.1-0.5-0.2-0.7-0.3
                C65.4,61.3,65.4,73.2,65.4,85.3z M65.9,26.5c4.6,2.8,9.1,5.5,13.6,8.2c0.5,0.3,0.7,0.1,0.9-0.2c1.6-1.8,3.3-3.7,4.9-5.5
                c0.5-0.5,1-1.1,1.5-1.6c-5.2-3.2-10.3-6.4-15.5-9.5C69.6,20.7,67.8,23.5,65.9,26.5z M28.6,17.7c-5.2,3.2-10.3,6.3-15.5,9.5
                c0.1,0.2,0.2,0.3,0.4,0.5c2,2.2,4,4.4,5.9,6.6c0.4,0.5,0.7,0.5,1.3,0.2c4.2-2.6,8.5-5.1,12.7-7.6c0.2-0.1,0.4-0.3,0.6-0.5
                C32.2,23.5,30.4,20.6,28.6,17.7z M60.4,46.7c-0.2-0.2-0.3-0.2-0.4-0.3c-3.2-1.7-6.3-3.4-9.5-5c-0.3-0.1-0.7-0.1-1,0
                c-3.1,1.6-6.2,3.3-9.3,4.9c-0.2,0.1-0.3,0.2-0.5,0.4c3.4,1.3,6.7,2.5,10.1,3.7c0.2,0.1,0.5,0.1,0.7,0C53.6,49.2,56.9,48,60.4,46.7z
                M59.9,17.2c-6.6,0-13.1,0-19.7,0c3.4,2.7,6.6,5.3,9.9,7.9C53.3,22.5,56.5,19.9,59.9,17.2z M86.6,32c-0.1,0.1-0.2,0.1-0.2,0.1
                c-1.5,1.6-3,3.3-4.4,4.9c-1.2,1.3-1.5,1.4-3.1,0.4c-1-0.6-1.9-1.1-2.9-1.7c1.5,2,3.2,3.9,4.8,5.8c0.2,0.2,0.6,0.4,0.8,0.3
                c3.2-1.3,6.3-2.7,9.5-4.1C89.5,35.8,88.1,33.9,86.6,32z M9,37.7c3.2,1.4,6.4,2.8,9.6,4.2c0.1,0.1,0.4,0,0.5-0.1
                c1.7-2,3.4-3.9,5.1-5.9c-1.2,0.5-2.3,1.2-3.4,1.9c-1,0.6-1.6,0.5-2.4-0.4c-1.3-1.4-2.5-2.8-3.8-4.2c-0.4-0.4-0.7-0.8-1.1-1.2
                C11.9,33.9,10.5,35.8,9,37.7z M9.7,46.8c3.4,0.7,6.7,1.5,10,2.2c0.6-1.8,1.1-3.6,1.6-5.3c-1.2,2-2.6,1.4-4.2,0.7
                c-2.1-1-4.3-1.9-6.5-2.8C10.3,43.3,10,45,9.7,46.8z M90.3,46.8c-0.3-1.8-0.6-3.5-0.9-5.2c-0.3,0.1-0.5,0.2-0.7,0.3
                c-2.3,1-4.6,2-6.9,3c-1.1,0.5-1.6,0.4-2.4-0.5c-0.2-0.2-0.4-0.4-0.8-0.8c0.6,2,1.2,3.7,1.7,5.5C83.7,48.3,86.9,47.5,90.3,46.8z"/>
            </ConditionalClipPath>
          </g>
        )}
        {name === "plusSign" && (
          <g>
            <ConditionalClipPath
              condition={isClipPath}
              wrapper={children => (
                <clipPath id="svg-path-plusSign">{children}</clipPath>
              )}
            >
              <path class="st0" d="M6.6,46.9c0.2-1.1,0.3-2.2,0.5-3.3c1.5-9.4,5.7-17.4,12.6-24c6.2-5.9,13.5-9.7,21.9-10.9
                c14.7-2.2,27.3,2,37.6,12.7c5.8,6.1,9.4,13.4,10.8,21.7c1.7,10.8-0.4,20.9-6.4,30.1c-1.1,1.7-3,2.1-4.6,1.1c-1.6-1-2-3-0.9-4.7
                c2.7-4.2,4.6-8.7,5.4-13.6c1.6-10.1-0.6-19.4-6.8-27.5c-5.3-7-12.4-11.5-21-13.1C41.6,12.8,30,17.2,20.9,28
                c-4.1,4.9-6.6,10.6-7.3,17c-1.6,13.2,2.8,24.2,13,32.6c5,4.1,10.7,6.5,17.1,7.4c8.1,1.1,15.7-0.4,22.8-4.5c0.9-0.5,1.8-0.8,2.9-0.6
                c1.3,0.4,2.2,1.2,2.4,2.6c0.2,1.4-0.3,2.6-1.6,3.4c-3.7,2.2-7.6,3.9-11.8,4.8c-2.1,0.5-4.2,0.7-6.4,1c-0.2,0-0.4,0.1-0.5,0.1
                c-2,0-3.9,0-5.9,0c-1.3-0.2-2.7-0.3-4-0.6c-8.3-1.4-15.5-5-21.6-10.7C12.9,74,8.6,66,7.1,56.4c-0.2-1.1-0.3-2.2-0.5-3.3
                C6.6,51,6.6,49,6.6,46.9z"
              />
              <path class="st0" d="M45.3,53.3c-3.9,0-7.7,0-11.5,0c-2.5,0-4-2.6-2.9-4.8c0.6-1.2,1.6-1.8,2.9-1.8c3.5,0,7,0,10.5,0
                c0.3,0,0.6,0,1,0c0-0.3,0-0.6,0-0.9c0-3.5,0-6.9,0-10.4c0-2,1.4-3.4,3.3-3.4c1.9,0,3.3,1.4,3.3,3.5c0,3.7,0,7.4,0,11.3
                c0.3,0,0.6,0,0.9,0c3.5,0,7,0,10.5,0c1.9,0,3.4,1.4,3.4,3.2c0,1.9-1.4,3.3-3.4,3.3c-3.5,0-6.9,0-10.4,0c-0.3,0-0.6,0-1,0
                c0,0.4,0,0.7,0,0.9c0,3.4,0,6.9,0,10.3c0,2.1-1.4,3.5-3.3,3.5c-1.9,0-3.3-1.4-3.3-3.5c0-3.4,0-6.8,0-10.2
                C45.3,54,45.3,53.7,45.3,53.3z"
              />
            </ConditionalClipPath>
          </g>
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