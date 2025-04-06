import React, { useRef } from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

export default function Model(props) {
    const { nodes, materials } = useGLTF('/scene.gltf');
    const texture = useTexture('/2557.jpg')
    return (
        <group {...props} dispose={null} scale={100}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.Lantern}
                // onPointerOver={(e) => console.log(e)}
                // onPointerMove={(e) => console.log('Pointer moved in Lantern')}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.Purpur_Slab}
                // onPointerMove={(e) => console.log('Pointer moved in Purpur_Slab')}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials.Torch}
                // onPointerMove={(e) => console.log('Pointer moved in Torch')}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.Sea_Pickle}
                // onPointerMove={(e) => console.log('Pointer moved in Sea_Pickle')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.Glass_Pane}
                // onPointerMove={(e) => console.log('Pointer moved in Glass_Pane')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials.Polished_Blackstone_Stairs}
                // onPointerMove={(e) => console.log('Pointer moved in Polished_Blackstone_Stairs')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.Stained_Glass_Pane}
                // onPointerMove={(e) => console.log('Pointer moved in Stained_Glass_Pane')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_9.geometry}
                    material={materials.Smooth_Sandstone_Stairs}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_10.geometry}
                    material={materials.Smooth_Sandstone_Stairs}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_11.geometry}
                    material={materials.Green_Glazed_Terracotta}
                // onPointerMove={(e) => console.log('Pointer moved in Green_Glazed_Terracotta')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_12.geometry}
                    material={materials.Green_Glazed_Terracotta}
                // onPointerMove={(e) => console.log('Pointer moved in Green_Glazed_Terracotta')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_13.geometry}
                    material={materials.Smooth_Sandstone_Stairs_0}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_14.geometry}
                    material={materials.Smooth_Sandstone_Stairs_0}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_15.geometry}
                    material={materials.Smooth_Sandstone_Stairs_0}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_16.geometry}
                    material={materials.Smooth_Sandstone_Stairs_0}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_17.geometry}
                    material={materials.Smooth_Sandstone_Stairs_0}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_18.geometry}
                    material={materials.Smooth_Sandstone_Stairs_0}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_19.geometry}
                    material={materials.Concrete}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_20.geometry}
                    material={materials.Concrete}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_21.geometry}
                    material={materials.Concrete}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_22.geometry}
                    material={materials.Concrete}
                // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_23.geometry}
                    material={materials.Concrete}
                // // onPointerMove={(e) => console.log('Pointer moved in Smooth_Sandstone_Stairs_0')}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_24.geometry}
                    material={materials.Concrete}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_25.geometry}
                    material={materials.Concrete}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_26.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_27.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_28.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_29.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_30.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_31.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_32.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_33.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_34.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_35.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_36.geometry}
                    material={materials.Concrete_0} s
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_37.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_38.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_39.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_40.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_41.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_42.geometry}
                    material={materials.Concrete_0}

                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_43.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_44.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_45.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_46.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_47.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_48.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_49.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_50.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_51.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_52.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_53.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_54.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_55.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_56.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_57.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_58.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_59.geometry}
                    material={materials.Concrete_0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_60.geometry}
                    material={materials.Concrete_0}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/scene.gltf')