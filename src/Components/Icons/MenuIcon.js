import React from 'react'

export const MenuIcon = (props) => {
  const { color, strokeWidth, width, height } = props;
  
  return (
    <svg 
      className="h-6 w-6" 
      fill="none" 
      stroke={color} 
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24" 
      height={height || "100%"}
      width={width || "100%"}
      xmlns="http://www.w3.org/2000/svg" 
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  )
}