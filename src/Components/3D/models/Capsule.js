import React, { forwardRef, useEffect, useRef } from 'react'
import { useGLTF, useProgress } from '@react-three/drei'
import angleToRadians from '../../../Helpers/angleToRadians'
import { s3Address } from '../../../Api/nutritivApi'
import { proxy, useSnapshot } from 'valtio'
import { useLocation, useNavigate } from 'react-router-dom'
import assignModelColor from '../../../Helpers/assignModelColor'

export const capsuleModelsState = proxy({color: "#ffdffd"})

export const Capsule = forwardRef(({ supermentName }, ref) => { // temp
  const snap = useSnapshot(capsuleModelsState);
  const location = useLocation();
  const { nodes, materials } = useGLTF(`${s3Address}assets/${supermentName}.glb`)

  useEffect(() => {
    // assignModelColor();
    window.location.pathname === "/Absorite" && (capsuleModelsState.color = "#bdb05f");
    window.location.pathname === "/Amethyst%20Extract" && (capsuleModelsState.color = "#2045a1");
    window.location.pathname === "/Baguettoids" && (capsuleModelsState.color = "#ad8546");
    window.location.pathname === "/Bicepstine" && (capsuleModelsState.color = "#d6dc1d");
    window.location.pathname === "/Jumpamine" && (capsuleModelsState.color = "#76e4fa");
    // window.location.pathname === "/Liquate" && (capsuleModelsState.color = "#0000ff");
    window.location.pathname === "/Lumosite" && (capsuleModelsState.color = "#e2e8ed");
    window.location.pathname === "/Magmalite" && (capsuleModelsState.color = "#eb7600");
    window.location.pathname === "/node_modules" && (capsuleModelsState.color = "#ecf016");
    window.location.pathname === "/Notavirusite" && (capsuleModelsState.color = "#b8e635");
    window.location.pathname === "/Nucleate" && (capsuleModelsState.color = "#35e65a");
    window.location.pathname === "/Serylanyponytailanyserine" && (capsuleModelsState.color = "#d635e6");
    window.location.pathname === "/Solvalitis" && (capsuleModelsState.color = "#d67392");    
    window.location.pathname === "/Titanium" && (capsuleModelsState.color = "#aea9aa");
    window.location.pathname === "/Tricepstine" && (capsuleModelsState.color = "#d6dc1d");
    window.location.pathname === "/Wolverite" && (capsuleModelsState.color = "#726ed7");
  }, [snap, location]);
  
  return (
    <group>
      {snap.color && (
        <group 
          dispose={null}
          rotation={[angleToRadians(30), 0, 0]}
          scale={12}
        >
          <group scale={0.1} position={[0.002,0,0.004]}>
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere.geometry} material={materials['standardSurface3.002']}    position={[-0.1, 0.2, 0.1]}                                   scale={0.06} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere001.geometry} material={materials['standardSurface3.002']} position={[0.1, 0.1, -0.1]}  rotation={[1.84, 0, 0]}          scale={0.05} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere002.geometry} material={materials['standardSurface3.002']} position={[0.1, 0.6, 0]}                                      scale={0.06} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere003.geometry} material={materials['standardSurface3.002']} position={[-0.1, 0.5, 0]}                                     scale={0.04} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere004.geometry} material={materials['standardSurface3.002']} position={[-0.2, 0.2, -0.1]} rotation={[0, 1.38, 0]}          scale={0.05} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere005.geometry} material={materials['standardSurface3.002']} position={[0.06, 0.4, -0.2]} rotation={[0, -1.3, 0]}         scale={0.06} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere006.geometry} material={materials['standardSurface3.002']} position={[-0.1, 0.3, -0.2]} rotation={[0, 0, 1.12]}          scale={0.01} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere007.geometry} material={materials['standardSurface3.002']} position={[0, 0.3, 0]}       rotation={[1.53, 0, 3.1]}        scale={0.07} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere008.geometry} material={materials['standardSurface3.002']} position={[0.1, 0.3, 0.1]}   rotation={[1.86, 1.1, -1.83]}    scale={0.02} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere009.geometry} material={materials['standardSurface3.002']} position={[0, 0.3, 0.2]}                                      scale={0.02} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere010.geometry} material={materials['standardSurface3.002']} position={[-0.2, 0.4, 0]}                                     scale={0.02} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere011.geometry} material={materials['standardSurface3.002']} position={[-0.1, 0.2, 0]}                                     scale={0.02} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere012.geometry} material={materials['standardSurface3.002']} position={[0.2, 0.05, 0.07]} rotation={[1.3, -0.64, -0.16]}   scale={0.03} />
            <mesh castShadow material-color={snap.color} geometry={nodes.Sphere013.geometry} material={materials['standardSurface3.002']} position={[0, 0.5, 0]}                                        scale={0.03} />
          </group>
          <mesh castShadow material-color={snap.color} geometry={nodes.polySurface3_1001.geometry} material={materials['standardSurface3.002']} position={[0, -0.05, 0]} scale={0.03} />
          <mesh castShadow material-color={snap.color} geometry={nodes.polySurface3_2001.geometry} material={materials.transparent_cap}         position={[0, 0.042, 0]} scale={0.03} />
        </group>
      )}
    </group>
  )
})

// useGLTF.preload(`${s3Address}assets/capsule-water.glb`);
