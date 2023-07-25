import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";
import Spline, { SPEObject } from "@splinetool/react-spline";

const MoziSpline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline
      .load("https://prod.spline.design/CYTHlvTvhIoFmrkT/scene.splinecode")
      .then(() => {
        const obj = spline.findObjectByName("M_cha4");
        // spline.setSize(300, 300);
      });
    splineRef.current = spline;
  }, []);

  return (
    <div className="absolute w-full h-full">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};

// const MoziSpline = () => {
//   const mozi = useRef<SPEObject>(null);

//   const onLoad = (spline: Application) => {
//     const obj = spline.findObjectByName("M_cha4");
//     mozi.current = obj;
//   };
// };

export default MoziSpline;
