import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { s3Address } from "../../../Api/nutritivApi";

  
export const GummyMold = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF(`${s3Address}assets/${props.supermentName}.glb`);
  return (
    <group scale={1} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.transparent_cap}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.1, 0.8, 1]}
      />
    </group>
  );
})

// useGLTF.preload("/folder.glb");