import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const StarField = () => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(10000 * 3);

  for (let i = 0; i < 10000; i++) {
    const i3 = i * 3;
    positions[i3 + 0] = THREE.MathUtils.randFloatSpread(2000);
    positions[i3 + 1] = THREE.MathUtils.randFloatSpread(2000);
    positions[i3 + 2] = THREE.MathUtils.randFloatSpread(2000);
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({ color: 0xffffff });
  const starField = useRef<THREE.Points>(null);

  useFrame(({ clock, camera }) => {
    const rot = clock.elapsedTime * 0.5;
    const radian = (rot * Math.PI) / 180;
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    camera.position.y = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return (
    <points geometry={geometry} material={material}>
      <fog attach="fog" args={[0xaaaaaa, 50, 2000]} />
    </points>
  );
};

const SpaceBack = () => {
  return (
    <div className="overflow-hidden w-screen h-screen flex justify-center items-center">
      <Canvas
        className="bg-gradient-to-b from-gray-900 to-slate-800 w-full h-full"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        camera={{
          fov: 70,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 2000,
          position: [0, 0, 1000],
        }}
      >
        <StarField />
      </Canvas>
    </div>
  );
};

export default SpaceBack;
