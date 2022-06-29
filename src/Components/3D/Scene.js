import { Environment, OrbitControls, PerspectiveCamera, Plane, softShadows, Sphere, useHelper } from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import { PointLightHelper, SpotLightHelper, DirectionalLightHelper } from 'three';
import { useFrame } from '@react-three/fiber';
import WaterPill from './pills/WaterPill';
import angleToRadians from '../../Helpers/angleToRadians';

softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 30,
  rings: 11, // Rings (default: 11) must be a int
})

export const Scene = () => {
  const pointLightRef = useRef();
  const spotLightHelperRef = useRef();
  const directionalLightRef = useRef();
  useHelper(pointLightRef, PointLightHelper, 1, "cyan")
  useHelper(spotLightHelperRef, SpotLightHelper, "red")
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "yellow")
  
  // On every frame change
  useFrame(state => {
    // console.log('# test :', centerRef)
  })
  
  return (
    <Suspense fallback={null}>
      {/* CAMERA */}
      <PerspectiveCamera
        makeDefault
        fov={65}
        position={[0.1, 0, 0.3]}
      />
      
      {/* CONTROLS */}
      <OrbitControls
        // autoRotate
        autoRotateSpeed={2}
        enablePan
        enableZoom={true}
        enableRotate={true}
        makeDefault
        target={[0, 0, 0]}
      />
      
      {/* ENVIRONMENT */}
      {/* <Environment 
        background
        files={'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr'}
      /> */}
      
      {/* MODEL */}
      <WaterPill />
      
      {/* GROUND */}
      <Plane 
        receiveShadow 
        args={[10, 10, 4, 4]}
        position={[0, -0.2, 0]} 
        rotation-x={-Math.PI / 2} 
      >
        <meshPhysicalMaterial opacity={0.5} />
      </Plane>
      {/* SHADOW */}
      <Plane 
        args={[10, 10, 4, 4]}
        position={[0, -0.2, 0]} 
        receiveShadow
        rotation-x={-Math.PI / 2} 
      >
        <shadowMaterial opacity={0.5} />
      </Plane>
      
      {/* LIGHTS */}
      <spotLight
        angle={angleToRadians(30)}
        castShadow
        distance={2}
        decay={1}
        intensity={1}
        penumbra={0.6}
        position={[0, 0.4, 0]}
        ref={spotLightHelperRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        intensity={0.3}
        distance={0.1}
        scale={1}
        ref={directionalLightRef}
        position={[0, 1, 0]}
        castShadow={true}
      />
      <pointLight
        intensity={4}
        distance={0.1}
        scale={0.02}
        ref={pointLightRef}
        position={[0, 0, 0]}
        castShadow={false}
      />
     
      {/* <ambientLight intensity={0.3}/>  */}
    </Suspense>
  )
}