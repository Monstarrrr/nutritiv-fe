import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { s3Address } from "../../../Api/nutritivApi";

export const GummyMold = forwardRef(({ supermentName, scale = 1 }, ref) => {
  const { nodes, materials } = useGLTF(`${s3Address}assets/${supermentName}.glb`);
  
  return (
    <group scale={1} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.transparent_cap}
        rotation={[0, -Math.PI / 2, 0]}
        scale={scale}
      />
    </group>
  );
})

// useGLTF.preload("/folder.glb");