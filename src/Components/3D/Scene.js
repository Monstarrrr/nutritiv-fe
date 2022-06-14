import { Environment, OrbitControls, PerspectiveCamera, Plane, softShadows, useHelper } from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import Model from './Weapon'
import { 
  BackSide, 
  SpotLightHelper, 
  DirectionalLightHelper } from 'three';
import { useFrame } from '@react-three/fiber';
import angleToRadians from '../../Helpers/angleToRadians';

softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 30,
  rings: 11, // Rings (default: 11) must be a int
})

export const Scene = () => {
  const directionalLightRef = useRef();
  // const spotLightRef2 = useRef();
  // const spotLightRef3 = useRef();
  // const spotLightRef4 = useRef();
  useHelper(directionalLightRef, DirectionalLightHelper, 'cyan')
  // useHelper(spotLightRef2, SpotLightHelper, 'yellow')
  // useHelper(spotLightRef3, SpotLightHelper, 'green')
  // useHelper(spotLightRef4, SpotLightHelper, 'pink')
  
  // On every frame change
  useFrame(state => {
    // console.log('# test :', centerRef)
  })
  
  return (
    <Suspense fallback={null}>
      
      {/* CAMERA */}
      <PerspectiveCamera
        makeDefault
        position={[10, 1, 0]}
      />
      
      {/* MODEL */}
      <Model />
      
      {/* GROUND */}
      <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.5, 0]} args={[10, 10, 4, 4]}>
        <meshBasicMaterial opacity={0.5} />
      </Plane>
      <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.5, 0]} args={[10, 10, 4, 4]}>
        <shadowMaterial opacity={0.5} />
      </Plane>
      
      {/* LIGHTS */}
      <directionalLight
        castShadow
        intensity={2}
        position={[10,10,0]}
        ref={directionalLightRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      

      {/* <spotLight
        angle={angleToRadians(40)} 
        castShadow
        decay={2}
        distance={16}
        penumbra={1}
        position={[6,1.5,0]}
        power={10}
        ref={spotLightRef2}
      />
      <spotLight
        angle={angleToRadians(40)} 
        castShadow
        decay={2}
        distance={14}
        penumbra={1}
        position={[0,1.5,-6]}
        power={10}
        ref={spotLightRef3}
      />
      <spotLight
        angle={angleToRadians(40)} 
        castShadow
        decay={2}
        distance={11}
        penumbra={1}
        position={[0,1.5,6]}
        power={10}
        ref={spotLightRef4}
      /> */}
      {/* <ambientLight intensity={1}/> */}
      
      {/* CONTROLS */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enablePan
        enableZoom={true}
        enableRotate
        makeDefault
      />
      
    </Suspense>
  )
}