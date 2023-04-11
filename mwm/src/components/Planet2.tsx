import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const Planet2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load("https://prod.spline.design/P2Ai7ZToLNlQTSQC/scene.splinecode");
    splineRef.current = spline;
  }, []);

  return (
    <div className="absolute w-full h-full">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};

export default Planet2;
