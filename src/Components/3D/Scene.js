import { Environment, OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import Model from './Weapon'
import { 
  BackSide, 
  SpotLightHelper, 
  DirectionalLightHelper } from 'three';
import { useFrame } from '@react-three/fiber';
import angleToRadians from '../../Helpers/angleToRadians';

export const Scene = () => {
  const spotLightRef1 = useRef();
  const spotLightRef2 = useRef();
  const spotLightRef3 = useRef();
  const spotLightRef4 = useRef();
  // useHelper(spotLightRef1, SpotLightHelper, 'cyan')
  // useHelper(spotLightRef2, SpotLightHelper, 'yellow')
  // useHelper(spotLightRef3, SpotLightHelper, 'green')
  // useHelper(spotLightRef4, SpotLightHelper, 'pink')
  
  // On every frame change
  useFrame(state => {
    // console.log('# test :', centerRef)
  })
  
  return (
    <Suspense fallback={null}>
      
      {/* ENVIRONMENT */}
      <Environment
        background
      >
        <mesh>
          <sphereGeometry args={[10, 20, 20]} />
          <meshBasicMaterial
            color="black"
            side={BackSide}
          />
        </mesh>
      </Environment>
      {/* CAMERA */}
      <PerspectiveCamera
        makeDefault
        position={[10, 1, 0]}
      />
      
      {/* MODEL */}
      <Model />
      
      {/* GROUND */}
      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI/2, 0, 0]} 
          position={[0, -2.3, 0]}
        >
          <planeBufferGeometry 
            attach='geometry' 
            args={[12,12]} 
          />
          <meshStandardMaterial 
            attach='material'
            color="black"
          />
        </mesh>
      </group>
      
      {/* LIGHTS */}
      <spotLight
        angle={angleToRadians(40)} 
        castShadow
        decay={2}
        distance={20}
        penumbra={1}
        position={[-6,1.5,0]}
        power={3}
        ref={spotLightRef1}
      />
      <spotLight
        angle={angleToRadians(40)} 
        castShadow
        decay={2}
        distance={20}
        penumbra={1}
        position={[6,1.5,0]}
        power={3}
        ref={spotLightRef2}
      />
      <spotLight
        angle={angleToRadians(40)} 
        castShadow
        decay={2}
        distance={20}
        penumbra={1}
        position={[0,1.5,-6]}
        power={3}
        ref={spotLightRef3}
      />
      <spotLight
        angle={angleToRadians(40)} 
        castShadow
        decay={2}
        distance={20}
        penumbra={1}
        position={[0,1.5,6]}
        power={3}
        ref={spotLightRef4}
      />
      {/* <ambientLight intensity={0.2}/> */}
      
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