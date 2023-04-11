import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import TubiSpline from "./Tubi";

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
    const rot = clock.elapsedTime * 0.1;
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
    <div className="w-screen h-screen flex justify-center items-center">
      <Canvas
        className="bg-gradient-to-br from-indigo-900 to-neutral-800 w-full h-full"
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
        {/* <TubiSpline /> */}
      </Canvas>
    </div>
  );
};

export default SpaceBack;
// import * as THREE from "three";
// import { useEffect, useRef } from "react";
// import TubiSpline from "./Tubi";

// const StarField = () => {
//   const geometry = new THREE.BufferGeometry();
//   const positions = new Float32Array(10000 * 3);

//   for (let i = 0; i < 10000; i++) {
//     const i3 = i * 3;
//     positions[i3 + 0] = THREE.MathUtils.randFloatSpread(2000);
//     positions[i3 + 1] = THREE.MathUtils.randFloatSpread(2000);
//     positions[i3 + 2] = THREE.MathUtils.randFloatSpread(2000);
//   }

//   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

//   const material = new THREE.PointsMaterial({ color: 0xffffff });
//   const starField = useRef<THREE.Points>(null);

//   useEffect(() => {
//     const animate = () => {
//       if (!starField.current) return;
//       const rot = performance.now() * 0.0001;
//       const radian = (rot * Math.PI) / 180;
//       starField.current.position.x = 1000 * Math.sin(radian);
//       starField.current.position.z = 1000 * Math.cos(radian);
//       starField.current.position.y = 0;
//       starField.current.lookAt(new THREE.Vector3(0, 0, 0));
//       requestAnimationFrame(animate);
//     };
//     animate();
//   }, []);

//   return (
//     <points ref={starField} geometry={geometry} material={material}>
//       <fog attach="fog" args={[0xaaaaaa, 50, 2000]} />
//     </points>
//   );
// };

// const SpaceBack = () => {
//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <canvas
//         className="bg-gradient-to-br from-blue-900 to-neutral-800 w-full h-full"
//         ref={(el) => {
//           if (!el) return;
//           const renderer = new THREE.WebGLRenderer({ canvas: el });
//           renderer.setClearColor(0x000000, 0);
//           const camera = new THREE.PerspectiveCamera(
//             70,
//             window.innerWidth / window.innerHeight,
//             0.1,
//             2000
//           );
//           camera.position.set(0, 0, 1000);
//           const scene = new THREE.Scene();
//           scene.fog = new THREE.Fog(0xaaaaaa, 50, 2000);
//           scene.add(camera, new StarField(), new TubiSpline());
//           const animate = () => {
//             renderer.render(scene, camera);
//             requestAnimationFrame(animate);
//           };
//           animate();
//         }}
//       />
//     </div>
//   );
// };

// export default SpaceBack;