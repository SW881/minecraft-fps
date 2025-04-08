import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function AK(props) {
    const { nodes, materials } = useGLTF('/AK.glb')

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0.geometry}
                material={materials['Material.005']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_1.geometry}
                material={materials['Material.016']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_2.geometry}
                material={materials['Material.015']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_3.geometry}
                material={materials['Material.014']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_4.geometry}
                material={materials['Material.001']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_5.geometry}
                material={materials.material_0}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_6.geometry}
                material={materials['Material.010']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_7.geometry}
                material={materials['Material.006']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_8.geometry}
                material={materials['Material.012']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_9.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_10.geometry}
                material={materials['Material.004']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_11.geometry}
                material={materials['Material.009']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_12.geometry}
                material={materials['Material.007']}
            />
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Cube018_Material005_0_13.geometry}
                material={materials['Material.008']}
            />
        </group>
    )
}

useGLTF.preload('/AK.glb')