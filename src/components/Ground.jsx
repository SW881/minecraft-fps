import React from 'react'
import { RigidBody } from "@react-three/rapier";
import MapMinecraft from "./MapMinecraft";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import Map from './Map';


const Ground = () => {
    return (

        <RigidBody type="fixed" colliders="trimesh" position={[0, 1, 0]} name="ground">
            {/* <mesh rotation={[-Math.PI / 2, 0, 0]} visible={true}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="white" />
            </mesh> */}
            {/* <MapMinecraft /> */}
            <Map />
        </RigidBody>
    )
}

export default Ground
