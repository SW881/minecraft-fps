import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, OrbitControls, PointerLockControls, Stats } from '@react-three/drei';
import * as THREE from "three";
import { BallCollider, CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import Player1 from './Player1';
import Ground from './Ground';
import Elements from './Elements';
import { Bloom, DepthOfField, EffectComposer, FXAA, Noise, SSAO, Vignette } from '@react-three/postprocessing';
import { DirectionalLightHelper } from 'three/src/Three.Core.js';
import Player2 from './Player2';
import VoxelCharacter from './character-components/VoxelCharacter';

const shadowOffset = 250;
let debug = true;

const Renderer3D = () => {
  return (
    <>
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap, enabled: true }}
        style={{ height: "100vh", backgroundColor: "lightblue" }} // Minecraft sky color
        gl={{ maxLights: 100, antialias: true, precision: 'high' }}
      >
        <Stats />
        <PointerLockControls />
        <Suspense>
          <Physics gravity={[0, -40, 0]} colliders={false} debug={debug}>
            <Elements />
            <Player1 />
            {/* <Player2 /> */}
            <Ground />
          </Physics>
          <ambientLight intensity={0.5} color="0x808080" />
          <Environment
            background
            backgroundBlurriness={1}
            preset="night"
          />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas >
    </>
  )
}

export default Renderer3D
