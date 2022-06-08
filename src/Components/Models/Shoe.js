import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Shoe({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/blue-pill/shoe.gltf')
  return (
    <group 
      dispose={null}
      scale={3}
      ref={group} 
      {...props} 
    >
      <mesh 
        geometry={nodes.shoe.geometry} 
        material={materials.laces}
      />
      <mesh 
        geometry={nodes.shoe_1.geometry} 
        material={materials.mesh} 
      />
      <mesh 
        geometry={nodes.shoe_2.geometry} 
        material={materials.caps} 
      />
      <mesh 
        geometry={nodes.shoe_3.geometry} 
        material={materials.inner} 
      />
      <mesh 
        geometry={nodes.shoe_4.geometry} 
        material={materials.sole} 
      />
      <mesh 
        geometry={nodes.shoe_5.geometry} 
        material={materials.stripes}
        material-color={"blue"}
      />
      <mesh 
        geometry={nodes.shoe_6.geometry} 
        material={materials.band} 
      />
      <mesh 
        geometry={nodes.shoe_7.geometry} 
        material={materials.patch} 
      />
    </group>
  )
}

useGLTF.preload('/shoe.gltf')
