import * as THREE from "three";
import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const sphere = new THREE.SphereGeometry(0.5, 16, 8);
const sunSphere = new THREE.SphereGeometry(20, 32, 20);

//lights

let light1 = new THREE.PointLight(0xffa500, 800);
light1.position.set(-10.2, 33.6, -10.2);
light1.castShadow = true
light1.visible=false
light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color:0xffa500 })));


let light2 = new THREE.PointLight(0xffa500, 800);
light2.position.set(-71.6, 38, 42);
light2.castShadow = true
light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffa500 })));


let light3 = new THREE.PointLight(0xffa500, 800);
light3.position.set(-23.5, 37.92, -137);
// light3.castShadow = true
// light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffa500 })));

let light4 = new THREE.PointLight(0xffa500, 800);
light4.position.set(76.12, 37.7, 119.40);
// light4.castShadow = true
// light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffa500 })));

let light5 = new THREE.PointLight(0xffa500, 800);
light5.position.set(26.14, 37.81, 21.15);
// light5.castShadow = true
// light5.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffa500 })));


let light6 = new THREE.PointLight(0xffa500, 2000);
light6.position.set(92.05, 33.5, 10.24);
// light6.castShadow = true
// light6.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffa500 })));


let light7 = new THREE.PointLight(0xffa500, 800);
light7.position.set(155.68, 35.23, -110.24);
// light7.castShadow = true
// light6.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffa500 })));


let light8 = new THREE.PointLight(0xffa500, 800);
light8.position.set(7.96, 39.78, -94.29);
// light8.castShadow = true
// light8.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffa500 })));

let light9 = new THREE.DirectionalLight(0xffffff, 5);
// light9.position.set(200, 200, 100);
light9.position.set(150, 150, -150);

light9.castShadow = true;
const shadow = light9.shadow;
shadow.mapSize.width = 4096;
shadow.mapSize.height = 4096;
// Set the bias
shadow.bias = -0.0001; // Adjust this value as needed
// Set the normal bias
shadow.normalBias = 0.5; // Adjust this value as needed
// Configure the shadow camera (adjust these values based on your scene)
shadow.camera.top = 250;
shadow.camera.bottom = -250;
shadow.camera.left = 250;
shadow.camera.right = -250;
// shadow.camera.near = 0.1;
// shadow.camera.far = 20;
light9.add(new THREE.Mesh(sunSphere, new THREE.MeshBasicMaterial({ color: 0xfdfbd3 })));

const Elements = () => {
    const { camera, gl, scene } = useThree();
    const boxRef = useRef();
    const [rotate, setRotate] = useState([1, 1, 1]);
    const [hovered, hover] = useState(null)


    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    scene.add(light4);
    scene.add(light5);
    scene.add(light6);
    scene.add(light7);
    scene.add(light8);
    scene.add(light9);

    return null
}

export default Elements
