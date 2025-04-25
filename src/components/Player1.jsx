import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef } from 'react';
import { CapsuleCollider, CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import * as RAPIER from "@dimforge/rapier3d-compat"

import usePersonControls from "../hooks/PlayerHooks.js";
import Weapon from "./Weapon.jsx";
import { Wireframe } from "@react-three/drei";
import { Character1 } from "./character-components/Character1.jsx";
import { Character2 } from "./character-components/Character2.jsx";
import VoxelCharacter from "./character-components/VoxelCharacter.jsx";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();
let runAudio = new Audio('/player_walk.mp3');

// sunLight.shadow.normalBias = 0.2;

const Player1 = () => {
    const { camera } = useThree();
    const playerRef = useRef();
    const headColliderRef = useRef();
    const objectInHandRef = useRef();
    const swayingObjectRef = useRef();
    const [moveSpeed, setMoveSpeed] = useState(20);
    const [playerHeight, setHeight] = useState(2);
    let { jump, backward, left, right, forward, crouch } = usePersonControls();
    const rapier = useRapier();
    const [isOnFloor, setIsOnFloor] = useState(false);
    const [maxJump, setMaxJump] = useState(6);

    useEffect(() => {
        // Set the aspect ratio once when the component is mounted
        camera.fov = 60;
        camera.aspect = 1920 / 1080; // Set fixed aspect ratio to 4:3
        camera.updateProjectionMatrix(); // Update the camera matrix to apply changes
        // camera.far = 1000;
        // camera.near = 0.1;
    }, [camera]);

    useFrame((state) => {
        if (!playerRef.current) return;

        const velocity = playerRef.current.linvel();

        frontVector.set(0, 0, backward - forward);
        sideVector.set(left - right, 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(moveSpeed).applyEuler(state.camera.rotation);

        if ((backward || left || right || forward) && !crouch && !playerRef.current.linvel() <= 0) {
            playRunSound();
        }

        playerRef.current.wakeUp();
        // playerRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

        const world = rapier.world;
        const rayOrigin = playerRef.current ? playerRef.current.translation() : null;
        const ray = world.castRay(new RAPIER.Ray(rayOrigin, { x: 0, y: -1, z: 0 }));
        // console.log("Ray Origin:", rayOrigin);
        // console.log("Raycast Hit:", ray);
        // console.log('Player Ref :', playerRef.current.translation().y);
        // console.log('Ray Origin :', rayOrigin.y);

        let currentDistance = playerRef.current.translation().y - rayOrigin.y
        // console.log({ currentDistance })

        // Jump logic
        if (jump && isOnFloor && maxJump >= 0) {
            setMaxJump(maxJump - 1)
            console.log({ maxJump })
            doJump();
        } else if (maxJump <= 0) {
            // console.log(`Can't Jump more..`)
            setTimeout(() => {
                setMaxJump(6);
            }, 100)
        }

        const { x, y, z } = playerRef.current.translation();
        state.camera.position.set(x, y, z);

        if (crouch) {
            setMoveSpeed(8);
            setHeight(1);
        } else {
            setMoveSpeed(20);
            setHeight(2);
        }

        // objectInHandRef.current.rotation.copy(state.camera.rotation);
        // objectInHandRef.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation));
    });

    const playRunSound = () => {
        // runAudio.play();
    }

    const doJump = () => {
        playerRef.current.setLinvel({ x: playerRef.current.linvel().x, y: 12, z: playerRef.current.linvel().z });
    };

    return (
        <>
            <group>
                <RigidBody position={[-114, 80, -18.16]} ref={playerRef} lockRotations type="dynamic" userData={{}}
                    onCollisionEnter={(other) => {
                        if (other.rigidBodyObject.name === "ground") {
                            // console.log('Rigid Body Object :', other.rigidBodyObject)
                            setIsOnFloor(true)
                            // console.log('Colliding with ground...')
                        }
                    }}
                    onCollisionExit={(other) => {
                        if (other.rigidBodyObject.name === "ground") {
                            // console.log('Rigid Body Object :', other.rigidBodyObject)
                            setIsOnFloor(false)
                            // console.log('Not Colliding with ground...')
                        }
                    }}>
                    <CuboidCollider args={[0.5, 0.5, 0.5]} position={[0, 1.5, 0]} />
                    <CuboidCollider args={[0.5, 0.65, 0.32]} position={[0, 0.35, 0]} />
                    <CuboidCollider args={[0.5, 0.8, 0.4]} position={[0, -1.1, 0]} />
                    <VoxelCharacter />
                </RigidBody>
            </group>
            {/* <group ref={objectInHandRef}>
                <group ref={swayingObjectRef}>
                    <Weapon scale={0.1} />
                </group>
            </group> */}
        </>
    )
}

export default Player1
