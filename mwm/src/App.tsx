import { Canvas, useFrame, Camera, useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";
import { Mesh } from "three";
import { PerspectiveCamera } from "@react-three/drei";

import SpaceBackground from "./components/SpaceBackground";
import NavBar from "./components/NavBar";
import TubiSpline from "./components/Tubi";

// // gltf
// type MyModelProps = {
//   modelPath: string;
// };

// const MyModel = ({ modelPath }: MyModelProps) => {
//   const gltf: GLTF = useLoader(GLTFLoader, modelPath);
//   if (!gltf) {
//     return null;
//   }
//   gltf.scene.scale.set(0.015, 0.015, 0.015);
//   // gltf.scene.rotation.x = -Math.PI/2;

//   return <primitive className="w-full h-full" object={gltf.scene} />;
// };

// const ThreeScene = () => {
//   return (
//     <Canvas id="main" className="w-full h-full bg-red-300">
//       <ambientLight />
//       <pointLight position={[0, 150, 50]} />
//       <MyModel modelPath="main.gltf" />
//     </Canvas>
//   );
// };

const App = () => {
  return (
    <>
      <div>
        {/* <NavBar /> */}
        <TubiSpline />
      </div>
    </>
  );
};

export default App;
