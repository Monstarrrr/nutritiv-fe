import { Environment, OrbitControls, PerspectiveCamera, Plane, softShadows, Stats, useHelper } from '@react-three/drei'
import React, { forwardRef, Suspense, useEffect, useRef, useState } from 'react'
import GummyModel from './models/Gummy';
import CapsuleModel from './models/Capsule';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import angleToRadians from '../../Helpers/angleToRadians';

softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 30,
  rings: 11, // (default: 11) must be a int
})

export const Scene = forwardRef(({ type, supermentName, homepageCard }, ref) => {
  const modelRotation = useRef(0);
  // const orbitControlsRef = useRef();
  const directionalLightRef = useRef(null);
  // const spotLightRef1 = useRef(null);
  // const spotLightRef2 = useRef(null);
  // const spotLightRef3 = useRef(null);
  const pointLightRef = useRef(null);
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "yellow")
  // useHelper(spotLightRef1, THREE.SpotLightHelper, 'cyan')
  // useHelper(spotLightRef2, THREE.SpotLightHelper, 'pink')
  // useHelper(spotLightRef3, THREE.SpotLightHelper, 'white')
  useHelper(pointLightRef, THREE.PointLightHelper, 'red')
  
  // On every frame change
  useFrame(state => {
    
    // Mouse tracking movement
    // const { x, y } = state.mouse;
    // if(!!ref.current){
    //   // console.log(x, y);
    //   ref.current.setAzimuthalAngle(angleToRadians(- x * 90));
    //   ref.current.setPolarAngle(angleToRadians(y * 50 + 90));
    //   ref.current.update();
    // }
  })
  
  console.log('# pointLightRef :', pointLightRef)
  
  return (
    <Suspense fallback={null}>
      
      {/* CAMERA */}
      {/* <PerspectiveCamera
        makeDefault
        position={[
          type === "pill" ? 7 : 9, 
          1, 
          0
        ]}
      /> */}
      
      {/* CONTROLS */}
      {/* <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enablePan={false}
        enableZoom={homepageCard ? false : true}
        minDistance={
          type === "pill" ? 2.65 : 7
        }
        maxDistance={
          homepageCard ? (
            type === "pill" ? 2.65 : 7
          ) : (
            type === "pill" ? 7 : 9
          )
        }
        minPolarAngle={angleToRadians(70)}
        maxPolarAngle={angleToRadians(100)}
        makeDefault
        ref={orbitControlsRef}
      /> */}
      
      {/* MODEL */}
      {/* {
        type === "gummy" ? (
          <GummyModel forwardRef={modelRotation} supermentName={supermentName} /> 
        ) : ( */}
          <CapsuleModel forwardRef={modelRotation} supermentName={supermentName} />
        {/* )
      } */}
      
      <Environment
        background={false}
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/hdri/venice/"
      >
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={THREE.FrontSide} />
        </mesh>
      </Environment>
      
      {/* GROUND */}
      {/* <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.7, 0]} args={[10, 10, 4, 4]}>
        <meshBasicMaterial opacity={0.5} />
      </Plane> */}
      {/* SHADOW */}
      
      {!homepageCard && (
        <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.9, 0]} args={[10, 10, 4, 4]}>
          <shadowMaterial opacity={0.5} />
        </Plane>
      )}
      
      {/* LIGHTS */}
      {/* <directionalLight
        castShadow
        intensity={3}
        position={[0, 6, 0]}
        ref={directionalLightRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      /> */}
      
      <pointLight 
        intensity={20}
        position={[0,0,0]}
        ref={pointLightRef}
      />
      
      {/* <spotLight
        angle={angleToRadians(10)} 
        // castShadow
        decay={2}
        distance={4}
        penumbra={1}
        position={[0, 0, -4]}
        power={10}
        ref={spotLightRef1}
      />
      <spotLight
        angle={angleToRadians(10)} 
        // castShadow
        decay={2}
        distance={4}
        penumbra={1}
        position={[4, 0, 0]}
        power={10}
        ref={spotLightRef2}
      />
      <spotLight
        angle={angleToRadians(10)} 
        // castShadow
        decay={2}
        distance={4}
        penumbra={1}
        position={[-4, 0, 0]}
        power={10}
        ref={spotLightRef3}
      /> */}
      {/* <ambientLight intensity={0.2}/> */}
    </Suspense>
  )
})