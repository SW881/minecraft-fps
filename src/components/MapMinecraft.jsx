import { useGLTF } from '@react-three/drei'
import React from 'react'

export default function MapMinecraft(props) {
    const { nodes, materials } = useGLTF('/d2_compressed.gltf');

    return (
        <group {...props} dispose={null} scale={100}>
            <mesh
                castShadows
                receiveShadow
                geometry={nodes.Object_41.geometry}
                material={materials.Concrete_0}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_1.geometry}
                material={materials.Lantern}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_2.geometry}
                material={materials.Purpur_Slab}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_3.geometry}
                material={materials.Torch}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_4.geometry}
                material={materials.Sea_Pickle}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_5.geometry}
                material={materials.Glass_Pane}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_6.geometry}
                material={materials.Polished_Blackstone_Stairs}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_7.geometry}
                material={materials.Stained_Glass_Pane}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_8.geometry}
                material={materials.Smooth_Sandstone_Stairs}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_9.geometry}
                material={materials.Green_Glazed_Terracotta}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_10.geometry}
                material={materials.Smooth_Sandstone_Stairs_0}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_41_11.geometry}
                material={materials.Concrete}
            />
        </group>
    )
}

useGLTF.preload('/d2_compressed.gltf')