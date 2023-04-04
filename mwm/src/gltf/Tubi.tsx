import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

type TubiProps = {
  [key: string]: any;
};

export function Tubi(props: TubiProps) {
  const { nodes, materials } = useGLTF("realTubi.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={10000000000}
        near={0.01}
        fov={31.42}
        position={[0.34, 115.52, 686.17]}
        rotation={[-0.01, 0.04, 0]}
      />
      <mesh geometry={nodes.M.geometry} material={materials.Mat} />
      <mesh
        geometry={nodes.Disc.geometry}
        material={materials["Mat.2"]}
        position={[6.41, 49.81, 28.83]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Disc_1.geometry}
        material={materials["Mat.1"]}
        position={[7.73, 46.62, 28.74]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/realTubi.gltf");
