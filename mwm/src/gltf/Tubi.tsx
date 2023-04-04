import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

type TubiProps = {
  [propName: string]: any;
};

export function Tubi(props: TubiProps) {
  const { nodes, materials } = useGLTF("/real.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={1000000000000}
        near={0.01}
        fov={31.42}
        position={[0.34, 115.52, 686.17]}
        rotation={[-0.01, 0.04, 0]}
      />
      <mesh geometry={nodes.M_1.geometry} material={materials.Mat} />
      <mesh
        geometry={nodes.Disc_2.geometry}
        material={materials["Mat.2"]}
        position={[16.03, 124.53, 72.08]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Disc_3.geometry}
        material={materials["Mat.1"]}
        position={[19.32, 116.54, 71.85]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/real.gltf");

// export default function App() {
//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <Suspense fallback={null}>
//         <Tubi />
//       </Suspense>
//     </Canvas>
//   )
// }
