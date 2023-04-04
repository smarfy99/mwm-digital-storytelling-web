import { Canvas, useFrame, Camera, useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";
import { Mesh } from "three";
import "./App.css";

type MyModelProps = {
  modelPath:string;
};

const MyModel = ({modelPath}:MyModelProps) => {
  const gltf:GLTF = useLoader(GLTFLoader, modelPath);
  gltf.scene.scale.set(0.015, 0.015, 0.015);
  return <primitive object={gltf.scene} />;
}

const Box = () => {
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.001;
  });
  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[0, 0, 1500]} />
      {/* <Box /> */}
      <MyModel modelPath="main.gltf" />
    </Canvas>
  );
};

const App = () => {
  return (
    <div className="App h-screen">
      <ThreeScene />
    </div>
  );
};

export default App;
