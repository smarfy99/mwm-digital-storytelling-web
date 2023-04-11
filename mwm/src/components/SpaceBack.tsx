// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { useRef } from "react";

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

//   useFrame(({ clock, camera }) => {
//     const rot = clock.elapsedTime * 0.5;
//     const radian = (rot * Math.PI) / 180;
//     camera.position.x = 1000 * Math.sin(radian);
//     camera.position.z = 1000 * Math.cos(radian);
//     camera.position.y = 0;
//     camera.lookAt(new THREE.Vector3(0, 0, 0));
//   });

//   return (
//     <points geometry={geometry} material={material}>
//       <fog attach="fog" args={[0xaaaaaa, 50, 2000]} />
//     </points>
//   );
// };

// const SpaceBack = () => {
//   return (
//     <div className="relative overflow-hidden w-screen h-screen flex justify-center items-center">
//       <Canvas
//         className="absolute bg-gradient-to-b from-gray-900 to-slate-800 w-full h-full"
//         onCreated={({ gl }) => {
//           gl.setClearColor(0x000000, 0);
//         }}
//         camera={{
//           fov: 70,
//           aspect: window.innerWidth / window.innerHeight,
//           near: 0.1,
//           far: 2000,
//           position: [0, 0, 1000],
//         }}
//       >
//         <StarField />
//       </Canvas>
//     </div>
//   );
// };

// export default SpaceBack;

// 그냥 react, typescript
import { useEffect, useRef } from "react";
import * as THREE from "three";

const SpaceBack = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rot = 0; 

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
    });

    const scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0xaaaaaa, 50, 2000);

    const camera = new THREE.PerspectiveCamera(70, 1000);

    const vertices = [];

    for (let i = 0; i < 10000; i++) {
      const star = new THREE.Vector3();
      star.x = THREE.MathUtils.randFloatSpread(2500);
      star.y = THREE.MathUtils.randFloatSpread(2500);
      star.z = THREE.MathUtils.randFloatSpread(2500);

      vertices.push(star.x, star.y, star.z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
    });
    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    function render() {
      rot += 0.03;
      const radian = (rot * Math.PI) / 180;
      camera.position.x = 1000 * Math.sin(radian);
      camera.position.z = 1000 * Math.cos(radian);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    render();

    window.addEventListener("resize", onResize);

    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    onResize();
  }, []);

  return (
      <canvas
        id="canvas"
        className="absolute bg-gradient-to-b from-gray-900 to-slate-800 w-full h-full"
        ref={canvasRef}
      />
  );
};

export default SpaceBack;
