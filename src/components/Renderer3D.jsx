import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, OrbitControls, PointerLockControls, Stats } from '@react-three/drei';
import * as THREE from "three";

import Ground from './Ground';
import Player from './Player';
import Elements from './Elements';
import { Bloom, DepthOfField, EffectComposer, FXAA, Noise, SSAO, Vignette } from '@react-three/postprocessing';
import { DirectionalLightHelper } from 'three/src/Three.Core.js';

const shadowOffset = 250;

const Renderer3D = () => {
  return (
    <>
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap, enabled: true }}
        style={{ height: "100vh", backgroundColor: "lightblue" }} // Minecraft sky color
        gl={{ maxLights: 100, antialias: true, precision: 'high' }}
      >
        <EffectComposer>
          {/* <DepthOfField focusDistance={0} focalLength={2} bokehScale={2} height={1080} /> */}
          {/* <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} />          <Noise opacity={0.02} /> */}
          {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
          <FXAA opacity={100} />
        </EffectComposer>
        <Stats />
        <PointerLockControls />
        <Suspense>

          <Physics gravity={[0, 0, 0]}>
            {/* <Player /> */}
          </Physics>

          <Physics gravity={[0, -40, 0]} colliders={false}>
            {/* <Bullets /> */}
            <Elements />
            <Player />
            <Ground />
          </Physics>

          <ambientLight intensity={0.5} color="0x808080" />

          {/* 
          <directionalLight
            castShadow
            // receiveShadow
            intensity={5}
            shadow={ }
            shadow-camera-top={shadowOffset}
            shadow-camera-bottom={-shadowOffset}
            shadow-camera-left={shadowOffset}
            shadow-camera-right={-shadowOffset}
            // shadow-camera-near={0.01}
            // shadow-camera-far={10}
            position={[100, 150, 100]}
            color="0xfdfbd3"
          /> */}

          {/* <directionalLight
            castShadow
            shadow={{
              mapSize: { width: 4096, height: 4096 },
              bias: -0.0001,
              normalBias: 0.05,
              camera: {
                top: 200,
                bottom: -200,
                left: 200,
                right: -200,
                near: 0.1,
                far: 500,
              },
            }}
          /> */}

          <Environment
            background
            backgroundBlurriness={1}
            preset="night" />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas >
    </>
  )
}

export default Renderer3D
