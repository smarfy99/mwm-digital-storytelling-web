import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const Planet1 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load("https://prod.spline.design/m12wzSK0bmNNl-Nm/scene.splinecode");
    splineRef.current = spline;
  }, []);

  return (
    <div className="absolute left-0">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};

export default Planet1;
