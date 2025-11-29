import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef } from "react";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";

import usePersonControls from "../hooks/PlayerHooks.js";
import Weapon from "./Weapon.jsx";
// import VoxelCharacter from "./character-components/VoxelCharacter.jsx";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();
let runAudio = new Audio("/player_walk.mp3");
const accelerationFactor = 0.9; // Adjust for responsiveness (0 to 1)

const Player1 = () => {
  const { camera } = useThree();
  const playerRef = useRef();
  const midBodyRef = useRef();
  const legRef = useRef();
  const swayingObjectRef = useRef();
  const objectInHandRef = useRef();
  const [moveSpeed, setMoveSpeed] = useState(20);
  const [rigidBodyPosition, setRigidBodyPosition] = useState([
    -114, 50, -18.16,
  ]);
  const [playerHeight, setHeight] = useState(2);
  let { jump, backward, left, right, forward, crouch } = usePersonControls();
  const rapier = useRapier();
  const [isOnFloor, setIsOnFloor] = useState(false);
  const [maxJump, setMaxJump] = useState(6);
  const [headRotation, setHeadRotation] = useState();
  const [bodyRotation, setBodyRotation] = useState([0, 0, 0]);

  useEffect(() => {
    // Set the aspect ratio once when the component is mounted
    camera.fov = 60;
    camera.aspect = 1920 / 1080; // Set fixed aspect ratio to 4:3
    camera.updateProjectionMatrix(); // Update the camera matrix to apply changes
    camera.far = 1000;
    camera.near = 0.1;
  }, [camera]);

  useFrame((state) => {
    if (!playerRef.current) return;

    const velocity = playerRef.current.linvel();

    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(10)
      .applyEuler(state.camera.rotation);

    if (
      (backward || left || right || forward) &&
      !crouch &&
      !playerRef.current.linvel() <= 0
    ) {
      playRunSound();
    }

    const targetVelocity = new THREE.Vector3(
      direction.x,
      velocity.y,
      direction.z
    );
    const newVelocity = new THREE.Vector3();

    newVelocity.lerpVectors(velocity, targetVelocity, accelerationFactor);

    playerRef.current.wakeUp();
    setRigidBodyPosition(velocity);
    playerRef.current.setLinvel(newVelocity);

    const world = rapier.world;
    const rayOrigin = playerRef.current
      ? playerRef.current.translation()
      : null;
    // const ray = world.castRay(new RAPIER.Ray(rayOrigin, { x: 0, y: -1, z: 0 }));

    // Jump logic
    if (jump && isOnFloor && maxJump >= 0) {
      setMaxJump(maxJump - 1);
      // console.log({ maxJump })
      doJump();
    } else if (maxJump <= 0) {
      // console.log(`Can't Jump more..`)
      setTimeout(() => {
        setMaxJump(6);
      }, 100);
    }

    const { x, y, z } = playerRef.current.translation();
    // state.camera.position.set(x, y + 1.5, z - 0.4); // Test position 1
    state.camera.position.set(x, y + 1.5, z + 4); // Test position 1

    if (crouch) {
      setMoveSpeed(8);
      setHeight(1);
    } else {
      setMoveSpeed(20);
      setHeight(2);
    }

    objectInHandRef.current.rotation.copy(state.camera.rotation);
    const cameraQuaternionRotation = camera.getWorldQuaternion(
      new THREE.Quaternion()
    );

    if (midBodyRef.current) {
      const cameraEuler = new THREE.Euler().setFromQuaternion(
        cameraQuaternionRotation
      );
      midBodyRef.current.setRotation(cameraEuler);
      let y = cameraEuler.y;
      if (0 <= y && y <= 1.5) {
        y = 0.75;
      } else if (0 >= y && y <= -1.5) {
        y = -0.75;
      } else if (0 >= y && y <= 1.5) {
        y = 0.75;
      } else if (0 >= y && y <= -1.5) {
        y = -0.75;
      }

      setBodyRotation([0, y, 0]);
    //   console.log("Euler Y : ", cameraEuler.y);
    }

    objectInHandRef.current.position
      .copy(state.camera.position)
      .add(state.camera.getWorldDirection(rotation));
    setHeadRotation(cameraQuaternionRotation);
  });

  const playRunSound = () => {
    runAudio.play();
  };

  const doJump = () => {
    playerRef.current.setLinvel({
      x: playerRef.current.linvel().x,
      y: 12,
      z: playerRef.current.linvel().z,
    });
  };

  return (
    <>
      <group>
        <RigidBody
          position={[-114, 50, -18.16]}
          ref={playerRef}
          lockRotations={true}
          type="dynamic"
          onCollisionEnter={(other) => {
            if (other.rigidBodyObject.name === "ground") {
              setIsOnFloor(true);
            }
          }}
          onCollisionExit={(other) => {
            if (other.rigidBodyObject.name === "ground") {
              setIsOnFloor(false);
            }
          }}
        >
          <CapsuleCollider
            args={[0.4, 0.3]}
            position={[0, -0.5, 0]}
            ref={legRef}
          />
        </RigidBody>
      </group>
      <group ref={objectInHandRef}>
        <group ref={swayingObjectRef}>
          <Weapon scale={0.1} />
        </group>
      </group>
    </>
  );
};

export default Player1;
