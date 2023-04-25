import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface className {

}

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
        className="fixed bg-gradient-to-b from-gray-900 to-slate-800 w-full h-full"
        ref={canvasRef}
      />
  );
};

export default SpaceBack;
