import { useFrame, useThree } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";

const Bullets = () => {
  const bulletRef = useRef();

  useFrame((state) => {
    bulletRef.current.setLinvel({ x: 0, y: 0, z: 0 });
  });

  return (
    <RigidBody position={[-114, 35, -26.16]} ref={bulletRef} lockRotationss>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial color="green" />
        <BallCollider args={[0.5, 0.5, 0.5]} />
      </mesh>
    </RigidBody>
  );
};

export default Bullets;
