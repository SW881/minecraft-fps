import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import React, { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import { AK } from './weapon-components/AK';
import usePersonControls from "../hooks/PlayerHooks";
import { BallCollider, CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import * as RAPIER from "@dimforge/rapier3d-compat";

// const recoilAmount = 0.3;
const recoilDuration = 100;
const easing = TWEEN.Easing.Quadratic.Out;

const Weapon = (props) => {
    const physicsRayCast = true;
    const { camera, scene } = useThree();
    const [isShooting, setIsShooting] = useState(false);
    const [gunPosition, setGunPosition] = useState([0.14, -0.2, 0.65]);
    const [gunRotation, setGunRotation] = useState([0, 1.5, 0]);
    const groupRef = useRef(new TWEEN.Group()); // Create a group for managing tweens
    const [recoilAmount, setRecoilAmount] = useState(0.5);
    let { reload } = usePersonControls();
    const [bullets, setBullets] = useState(10000);
    const mouse = new THREE.Vector2(1, 1);
    const rapier = useRapier();
    const world = rapier.world;
    const weaponRef = useRef();
    const recolRef = useRef();

    // Mouse events to trigger shooting state
    useEffect(() => {
        const handleMouseDown = (ev) => {
            ev.preventDefault();
            if (ev.button === 0) {
                setIsShooting(true);
            }

            if (ev.button === 2) {
                setGunPosition([0, -0.1, 0.72]);
                setGunRotation([0, 1.57, 0]);
                setRecoilAmount(0.05);
            }
        }
        const handleMouseUp = (ev) => {
            ev.preventDefault();
            if (ev.button === 0) {
                setIsShooting(false);
            }

            if (ev.button === 2) {
                setGunPosition([0.14, -0.18, 0.65]);
                setGunRotation([0, 1.5, 0]);
                setRecoilAmount(0.5);
            }
        }

        const onMouseMove = (event) => {
            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        }

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        document.addEventListener('mousemove', onMouseMove);

        if (isShooting && bullets >= 1) {
            setBullets(bullets - 1);
            document.getElementById('bullets').innerHTML = bullets + '/10000'
            startShooting(); // Start shooting animation when the state is true
        }

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isShooting]);

    // Generate recoil offset
    const generateRecoilOffset = () => {
        return new THREE.Vector3(
            Math.random() * recoilAmount,
            Math.random() * recoilAmount,
            Math.random() * recoilAmount
        );
    };

    // Generate new recoil position
    const generateNewPositionOfRecoil = (currentPosition) => {
        const recoilOffset = generateRecoilOffset();
        return currentPosition.clone().add(recoilOffset);
    };

    const initRecoilAnimation = () => {
        const currentPosition = new THREE.Vector3(0, 0, 0); // Current position of the weapon
        const initialPosition = new THREE.Vector3(0, 0, 0); // Initial position after recoil
        const newPosition = generateNewPositionOfRecoil(currentPosition);

        // Recoil animation: Move the weapon up/down
        const twRecoilAnimation = new TWEEN.Tween(currentPosition)
            .to(newPosition, recoilDuration)
            .easing(easing)
            .yoyo(true)
            .duration(150)
            .onUpdate(() => {
                if (weaponRef.current) {
                    weaponRef.current.position.copy(currentPosition); // Update the weapon position
                }
            }).onComplete(() => {
                groupRef.current.remove(twRecoilAnimation); // Clean up after recoil back animation completes
                recolRef.current = null;
            }); // Start immediately when created

        // Recoil back animation: Move the weapon back to the initial position
        const twRecoilBackAnimation = new TWEEN.Tween(currentPosition)
            .to(initialPosition, recoilDuration)
            .easing(easing)
            .yoyo(true)
            .duration(100)
            .onUpdate(() => {
                if (weaponRef.current) {
                    weaponRef.current.position.copy(currentPosition); // Update the weapon position
                }
            })
            .onComplete(() => {
                groupRef.current.remove(twRecoilBackAnimation); // Clean up after recoil back animation completes
                // let shootAudio = new Audio('/ak_shot.mp3');
                // shootAudio.play();
            });


        twRecoilAnimation.chain(twRecoilBackAnimation);

        groupRef.current.add(twRecoilAnimation); // Add recoil animation to group
        groupRef.current.add(twRecoilBackAnimation); // Add recoil back animation to grou

        recolRef.current = twRecoilAnimation;
        return twRecoilAnimation; // Return recoil animation to be triggered
    };


    // Trigger recoil animation when shooting starts
    const startShooting = () => {
        if (bullets >= 0) {
            const recoilAnimation = initRecoilAnimation();
            recoilAnimation.start(); // Start the recoil animation

            // Raycasting using Rapier Physics and Shoot bullets using TWEEN
            if (physicsRayCast) {
                if (world) {
                    // Camera position and direction
                    const cameraPosition = camera.position.clone();
                    const cameraDirection = new THREE.Vector3();
                    camera.getWorldDirection(cameraDirection);

                    // Convert Three.js vectors to Rapier vectors
                    const rayOrigin = new RAPIER.Vector3(
                        cameraPosition.x,
                        cameraPosition.y,
                        cameraPosition.z
                    );

                    // Normalize using Rapier's Vector3
                    const rayDirection = new RAPIER.Vector3(
                        cameraDirection.x * 500,
                        cameraDirection.y * 500,
                        cameraDirection.z * 500,
                    );

                    const maxToi = 500; // Maximum Time of Impact
                    const solid = true; // Detect only solid objects
                    const ray = new RAPIER.Ray(rayOrigin, rayDirection);

                    const hit = world.castRay(ray, maxToi, false); // Perform the raycast

                    if (hit) {
                        console.log("Hit Detected:", hit.timeOfImpact);
                        const hitPoint = new THREE.Vector3(
                            rayOrigin.x + rayDirection.x * hit.timeOfImpact,
                            rayOrigin.y + rayDirection.y * hit.timeOfImpact,
                            rayOrigin.z + rayDirection.z * hit.timeOfImpact
                        );

                        console.log("Hit Point:", hitPoint);

                        // Optional: Add hit marker
                        const hitMarker = new THREE.Mesh(
                            new THREE.SphereGeometry(0.05),
                            new THREE.MeshToonMaterial({ color: 0xff0000 })
                        );
                        hitMarker.position.copy(hitPoint);
                        scene.add(hitMarker);

                        // Start position: Camera position
                        const startPosition = camera.position.clone();
                        hitMarker.position.copy(startPosition);
                        console.log({ startPosition })

                        // Add marker to the scene
                        scene.add(hitMarker);

                        // Animation: Move from camera to hit point
                        const shootAnimation = new TWEEN.Tween(startPosition)
                            .to({ x: hitPoint.x, y: hitPoint.y, z: hitPoint.z }, 100)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .yoyo(true)
                            .duration(100)
                            .onUpdate(() => {
                                hitMarker.position.copy(startPosition);
                            }).onComplete(() => {
                                console.log("Bullet hit at:", hitPoint);
                                //     // Optional: Remove marker after hit
                                // scene.remove(hitMarker);
                            }).start();

                        groupRef.current.add(shootAnimation); // Add recoil animation to group

                        setBullets((prev) => prev - 1);
                    } else {
                        console.log("No hit detected.");
                    }
                } else {
                    console.error("Rapier world is not initialized.");
                }

                setBullets((prev) => prev - 1);
            } else {
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(new THREE.Vector2(0, 0), camera); // From camera center
                const intersections = raycaster.intersectObjects(scene.children);

                if (intersections.length > 0) {
                    const hitPoint = intersections[0].point;
                    console.log("Hit Point:", hitPoint);

                    // Create the hit marker (bullet)
                    const hitMarker = new THREE.Mesh(
                        new THREE.SphereGeometry(0.05),
                        new THREE.MeshBasicMaterial({ color: 0xff0000 })
                    );

                    // Start position: Camera position
                    const startPosition = camera.position.clone();
                    hitMarker.position.copy(startPosition);
                    console.log({ startPosition })

                    // Add marker to the scene
                    scene.add(hitMarker);

                    // Animation: Move from camera to hit point
                    const shootAnimation = new TWEEN.Tween(startPosition)
                        .to({ x: hitPoint.x, y: hitPoint.y, z: hitPoint.z }, 100)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .yoyo(true)
                        .duration(100)
                        .onUpdate(() => {
                            hitMarker.position.copy(startPosition);
                        }).onComplete(() => {
                            console.log("Bullet hit at:", hitPoint);
                            //     // Optional: Remove marker after hit
                            // scene.remove(hitMarker);
                        }).start();

                    groupRef.current.add(shootAnimation); // Add recoil animation to group

                } else {
                    console.log("No hit detected.");
                }

                setBullets((prev) => prev - 1);
            }
        }
    };

    // Update the tween group in the animation loop
    useFrame(() => {
        if (reload) {
            document.getElementById('bullets').innerHTML = bullets + '/10000'
            setBullets(10000);
        }

        groupRef.current.update(); // Update the tween group

        if (isShooting && !recolRef.current && bullets >= 0) {
            setBullets(bullets - 1);
            document.getElementById('bullets').innerHTML = bullets + '/10000'
            startShooting();
        }
    });

    return (
        <>
            <group {...props} position={gunPosition} rotation={gunRotation}>
                <group ref={weaponRef}>
                    <AK />
                </group>
            </group>
        </>
    );
};

export default Weapon;