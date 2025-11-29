import React from 'react'
import { RigidBody } from "@react-three/rapier";
import Map from './Map';


const Ground = () => {
    return (
        <RigidBody type="fixed" colliders="trimesh" position={[0, 1, 0]} name="ground">
            <Map />
        </RigidBody>
    )
}

export default Ground
