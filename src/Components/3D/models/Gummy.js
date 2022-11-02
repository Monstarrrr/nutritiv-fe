import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const s3Address = process.env.REACT_APP_S3_ADDRESS;

const supermentName = "gummy-pi" // temp

export default function Model({ _ }) {
  const group = useRef()
  const { nodes, materials } = useGLTF(`${s3Address}assets/${supermentName}.glb`)
  
  return (
    <group scale={0.45} ref={group} dispose={null}>
      <mesh wireframe castShadow geometry={nodes.typeMesh2003.geometry} material={materials['lambert9.001']} position={[0, -0.16, -0.01]} rotation={[1.55, 0, 0]} scale={[0.22, 0.16, 0.22]} />
      <mesh wireframe castShadow geometry={nodes.Cube002.geometry} material={materials.transparent_cap} position={[-0.05, -0.32, 0.01]} scale={2.19} />
    </group>
  )
}

useGLTF.preload('/model-jelly-pi.glb')