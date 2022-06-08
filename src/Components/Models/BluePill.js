import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

export default function BluePill({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/blue-pill.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-3.63, 0, 0]}>
        <mesh geometry={nodes.polySurface3_1.geometry} material={materials.standardSurface3} />
        <mesh geometry={nodes.polySurface3_2.geometry} material={materials.lambert2} />
      </group>
      <mesh geometry={nodes.pSphere10.geometry} material={materials.lambert1} position={[-2.95, -0.12, 0]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere11.geometry} material={materials.lambert1} position={[-3.89, 0.28, 0.16]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere12.geometry} material={materials.lambert1} position={[-3.71, 0.67, 0.69]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere13.geometry} material={materials.lambert1} position={[-3.23, 0.67, 0.26]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere14.geometry} material={materials.lambert1} position={[-3.91, 0.67, -0.54]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere15.geometry} material={materials.lambert1} position={[-3.75, 1.4, 0.03]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere16.geometry} material={materials.lambert1} position={[-4.18, 0.79, 0.03]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere17.geometry} material={materials.lambert1} position={[-3.58, 0.53, 0.03]} scale={[0.15, 0.14, 0.15]} />
      <mesh geometry={nodes.pSphere2.geometry} material={materials.lambert1} position={[-3.41, 1.68, 0.04]} scale={0.25} />
      <mesh geometry={nodes.pSphere3.geometry} material={materials.lambert1} position={[-3.84, 0.99, 0.04]} scale={0.25} />
      <mesh geometry={nodes.pSphere4.geometry} material={materials.lambert1} position={[-3.31, 0.99, -0.35]} scale={0.25} />
      <mesh geometry={nodes.pSphere5.geometry} material={materials.lambert1} position={[-3.43, 0.26, 0.43]} scale={0.25} />
      <mesh geometry={nodes.pSphere6.geometry} material={materials.lambert1} position={[-4.22, 0.26, -0.19]} scale={0.25} />
      <mesh geometry={nodes.pSphere7.geometry} material={materials.lambert1} position={[-3.33, 0, -0.49]} scale={0.25} />
    </group>
  )
}