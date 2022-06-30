import { Environment, OrbitControls, PerspectiveCamera, Plane, softShadows, Stats, useHelper } from '@react-three/drei'
import React, { Suspense, useEffect, useRef } from 'react'
import Model from './pills/WaterPill';
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
  const modelRotation = useRef(0);
  const orbitControlsRef = useRef(null);
  const directionalLightRef = useRef(null);
  const spotLightRef1 = useRef(null);
  const spotLightRef2 = useRef(null);
  const spotLightRef3 = useRef(null);
  // useHelper(directionalLightRef, DirectionalLightHelper, 1, "yellow")
  // useHelper(spotLightRef1, SpotLightHelper, 'cyan')
  // useHelper(spotLightRef2, SpotLightHelper, 'pink')
  // useHelper(spotLightRef3, SpotLightHelper, 'white')
  
  // On every frame change
  useFrame(state => {
    const { x, y } = state.mouse;
    if(!!orbitControlsRef.current){
      orbitControlsRef.current.setAzimuthalAngle(angleToRadians(- x * 90));
      orbitControlsRef.current.setPolarAngle(angleToRadians(y * 10 + 90));
      orbitControlsRef.current.update();
    }
  })
  
  return (
    <Suspense fallback={null}>
      <Stats />
      
      {/* CAMERA */}
      <PerspectiveCamera
        makeDefault
        position={[7, 1, 0]}
      />
      
      {/* CONTROLS */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enablePan={false}
        enableZoom={true}
        // enableRotate
        makeDefault
        ref={orbitControlsRef}
      />
      
      {/* MODEL */}
      <Model forwardRef={modelRotation} />
      
      {/* GROUND */}
      {/* <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.7, 0]} args={[10, 10, 4, 4]}>
        <meshBasicMaterial opacity={0.5} />
      </Plane> */}
      {/* SHADOW */}
      <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.7, 0]} args={[10, 10, 4, 4]}>
        <shadowMaterial opacity={0.5} />
      </Plane>
      
      {/* LIGHTS */}
      <directionalLight
        castShadow
        intensity={2}
        position={[0, 6, 0]}
        ref={directionalLightRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <spotLight
        angle={angleToRadians(10)} 
        // castShadow
        decay={2}
        distance={7}
        penumbra={1}
        position={[0, 0, -4]}
        power={10}
        ref={spotLightRef1}
      />
      <spotLight
        angle={angleToRadians(10)} 
        // castShadow
        decay={2}
        distance={7}
        penumbra={1}
        position={[4, 0, 0]}
        power={10}
        ref={spotLightRef2}
      />
      <spotLight
        angle={angleToRadians(10)} 
        // castShadow
        decay={2}
        distance={7}
        penumbra={1}
        position={[-4, 0, 0]}
        power={10}
        ref={spotLightRef3}
      />
      <ambientLight intensity={0.2}/>
    </Suspense>
  )
}