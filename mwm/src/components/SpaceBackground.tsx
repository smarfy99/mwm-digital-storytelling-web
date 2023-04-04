import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, MeshProps, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Tubi } from '../gltf/Tubi';

interface StarProps extends MeshProps {
  points: number[][];
}

function Star({ points, ...props }: StarProps) {
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta;
      mesh.current.rotation.y += delta;
      mesh.current.scale.x =
        1 - Math.abs(Math.sin(state.clock.elapsedTime)) * 0.1;
      mesh.current.scale.y =
        1 - Math.abs(Math.sin(state.clock.elapsedTime)) * 0.1;
      mesh.current.scale.z =
        1 - Math.abs(Math.sin(state.clock.elapsedTime)) * 0.1;
    }
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial attach="material" color={0xffffff} />
      <pointLight color={0xffffff} intensity={0.5} position={[0, 0, 1]} />
    </mesh>
  );
}

interface StarFieldProps {
  starCount: number;
}

function StarField({ starCount }: StarFieldProps) {
  const stars = useMemo(
    () =>
      new Array(starCount).fill(0).map(() => ({
        position: [
          Math.random() * 100 - 50,
          Math.random() * 100 - 50,
          Math.random() * 100 - 50,
        ],
        scale: Math.random() + 20,
        points: [
          [-1.5, -1.5, 0],
          [0, -3, 0],
          [1.5, -1.5, 0],
          [3, 0, 0],
          [1.5, 1.5, 0],
          [0, 3, 0],
          [-1.5, 1.5, 0],
          [-3, 0, 0],
          [-1.5, -1.5, 0],
        ] as [number, number, number][],
      })),
    [starCount]
  );

  return (
    <>
      {stars.map(({ position, scale, points }, index: number) => (
        <Star
          key={index}
          position={position as unknown as THREE.Vector3}
          scale={[scale, scale, scale]}
          points={points}
        />
      ))}
    </>
  );
}

function SpaceBackground() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Canvas className="w-full h-full">
        <color attach="background" args={["#000"]} />
        <StarField starCount={200} />
        <Tubi />
      </Canvas>
    </div>
  );
}

export default SpaceBackground;
