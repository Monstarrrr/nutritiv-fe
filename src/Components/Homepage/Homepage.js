import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import styles from './Homepage.module.scss';
import { Scene } from '../3D/Scene';

export const Homepage = () => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  
  return (
    <div>
      <div className={styles.iceberg}>
        <video width="100%" height="100%" autoPlay loop muted playsInline>
          <source src="/video_iceberg.webm" type="video/webm" />
        </video>
      </div>
      
      {/* <video autoPlay loop width="1080" height="1080">
        <source src="/test.webm" type="video/webm" />
        <source src="video.mov" type="video/quicktime" />
        Couldn't load the video on your device.
      </video> */}
      
      {/* THREE JS TESTING */}
      {/* <div style={{
          background: "transparent", 
          height: "500px", 
          width: "500px"
      }}>
        <Canvas shadows>
          <Scene type="pill" />
        </Canvas>
      </div> */}
    </div>
  )
}