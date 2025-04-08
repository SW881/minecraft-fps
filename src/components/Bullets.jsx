import { useFrame, useThree } from '@react-three/fiber';
import { BallCollider, CapsuleCollider, CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useRef } from 'react'

const Bullets = () => {
    const bulletRef = useRef();
    const { camera, gl } = useThree();

    useFrame((state) => {
        // const { x, y, z } = playerRef.current.translation();
        // state.camera.position.set(x, y, z);
        // bulletRef.current.translation().x = state.camera.position.x
        // bulletRef.current.translation().y = state.camera.position.y
        // bulletRef.current.translation().z = state.camera.position.z

        bulletRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    })

    return (
        // <RigidBody ref={bulletRef} lockRotations position={[-114, 50, -26.16]} type='dynamic'>
        //     <mesh>
        //         <boxGeometry args={[1, 1, 1]} />
        //         <meshStandardMaterial color="yellow" />
        //         <CuboidCollider args={[0.5, 0.5, 0.5]} density={0} friction={0} />
        //     </mesh>
        // </RigidBody>

        <RigidBody position={[-114, 35, -26.16]} ref={bulletRef} lockRotationss>
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshPhongMaterial color="green" />
                <BallCollider args={[0.5, 0.5, 0.5]} friction={0} />
            </mesh>
        </RigidBody>
    )
}

export default Bullets
