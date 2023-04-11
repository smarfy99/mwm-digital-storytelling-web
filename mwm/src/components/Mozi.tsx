import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const TubiSpline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    // spline.load("https://prod.spline.design/FzdrAwf7eidWDQIc/scene.splinecode");
    spline.load("https://prod.spline.design/CYTHlvTvhIoFmrkT/scene.splinecode");
    splineRef.current = spline;
  }, []);

  return (
    <div className="absolute flex w-full h-full">
      <canvas className="flex w-full h-full" ref={canvasRef} />
    </div>
  );
}

export default TubiSpline;
