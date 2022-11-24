import React, { forwardRef } from 'react'

const CanvasDefaultList = forwardRef((props, ref) => {
  const refsNames = require("../../Helpers/canvasRefs.json");
  const refs = Object.fromEntries(refsNames.map((prop) => [prop, ref[prop]]));

  return (
    <>
      {Object.values(refs).map((mappedRef, i) => (
        <div 
          className={`default-canvas-${i}`} 
          key={i} 
          ref={mappedRef}
          style={{display: "none"}} 
        />
      ))}
    </>
  )
});

export default CanvasDefaultList;