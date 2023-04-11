import { Canvas, useFrame, Camera, useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";
import { Mesh } from "three";
import { PerspectiveCamera } from "@react-three/drei";

import NavBar from "./components/NavBar";
import TubiSpline from "./components/Tubi";
import SpaceBack from "./components/SpaceBack";

const App = () => {
  return (
    <>
      <div>
        {/* <NavBar /> */}
        <SpaceBack />
        {/* <TubiSpline /> */}
      </div>
    </>
  );
};

export default App;
