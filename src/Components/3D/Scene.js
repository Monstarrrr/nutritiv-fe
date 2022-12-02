import { Environment, Html, Plane, softShadows, useHelper, useProgress } from '@react-three/drei'
import React, { forwardRef, Suspense, useEffect, useRef } from 'react'
import {GummyBlob} from './models/GummyBlob';
import {GummyMold} from './models/GummyMold';
import {Capsule} from './models/Capsule';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { tokens } from '../../Helpers/styleTokens';
import { proxy, useSnapshot } from 'valtio';
import { useLocation } from 'react-router-dom';

softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 30,
  rings: 11, // (default: 11) must be a int
})

function Loader() {
  const { progress, errors } = useProgress();
  
  return (
    <Html
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: errors > 0 ? tokens.color.error : tokens.color.contrastLight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: 'relative',
          top: "78px",
          left: "-50%",
        }}
      >
        {errors > 0 ? (
          errors.map(err => (
            <div>{err}</div>
          ))
        ) : (
          <>
            {Math.ceil(progress)}%<br />loaded
          </>
        )}
      </div>
    </Html>
  )
}

export const Scene = forwardRef(({ type, rotation, scale, supermentName, color, homepageCard }, ref) => {
  const modelRotation = useRef(0);
  // const orbitControlsRef = useRef();
  // const directionalLightRef = useRef(null);
  // const spotLightRef1 = useRef(null);
  const pointLightRef = useRef(null);
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "yellow")
  // useHelper(spotLightRef1, THREE.SpotLightHelper, 'cyan')
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
  
  return (
    <Suspense fallback={<Loader />}>
      
      {/* MODEL */}
      {type === "gummyBlob" && (
        <GummyBlob forwardRef={modelRotation} supermentName={supermentName} scale={scale} rotation={rotation} /> 
      )}
      {type === "gummyMold" && (
        <GummyMold forwardRef={modelRotation} supermentName={supermentName} scale={scale} rotation={rotation} />
      )}
      {type === "capsule" && (
        <Capsule forwardRef={modelRotation} supermentName={supermentName} scale={scale} rotation={rotation} supermentColor={color} />
      )}
      
      <Environment
        background={false}
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/hdri/venice/"
        blur={0.4}
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
      {/* {!homepageCard && ( */}
        <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.9, 0]} args={[10, 10, 4, 4]}>
          <shadowMaterial opacity={0.5} />
        </Plane>
      {/* )} */}
      
      {/* LIGHTS */}
      <directionalLight
        castShadow
        intensity={0.2}
        position={[0, 6, 0]}
        // ref={directionalLightRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* <pointLight 
        intensity={type === "capsule" ? 30 : 1}
        position={[0,0,0]}
        ref={pointLightRef}
      /> */}
      
      {/* <spotLight
        angle={angleToRadians(10)} 
        // castShadow
        decay={2}
        distance={4}
        penumbra={1}
        position={[0, 0, -4]}
        power={10}
        ref={spotLightRef1}
      /> */}

      <ambientLight intensity={0.2}/>
    </Suspense>
  )
})