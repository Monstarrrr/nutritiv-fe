import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { s3Address } from "../../../Api/nutritivApi";
import angleToRadians from "../../../Helpers/angleToRadians";

export const GummyMold = forwardRef(({ 
  supermentName, 
  scale = 1, 
  rotation = [angleToRadians(45), 0, angleToRadians(45)] 
}, _) => {
  
  const { nodes, materials } = useGLTF(`${s3Address}assets/${supermentName}.glb`);
  
  console.log('# rotation :', rotation)
  console.log('# superment :', supermentName)

  return (
    <group scale={1} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.transparent_cap}
        rotation={rotation}
        scale={scale}
      />
    </group>
  );
})

// useGLTF.preload("/folder.glb");