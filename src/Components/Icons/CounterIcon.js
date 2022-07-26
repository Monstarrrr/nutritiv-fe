import React from 'react'

export const CounterIcon = (props) => {
  const { 
    count, backgroundColor, textColor, width, height, relativeFontSize 
  } = props;
  
  return (
    <svg
      fill={backgroundColor}
      viewBox="0 0 100 100" 
      height={height || "100%"}
      width={width || "100%"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" />
      <text 
        x="35" 
        y="66" 
        fontSize={relativeFontSize} 
        fill={textColor}
      >
        {count || 0}
      </text>
    </svg>
  )
}