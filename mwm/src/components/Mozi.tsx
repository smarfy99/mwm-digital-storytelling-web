import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

function TubiSpline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load("https://prod.spline.design/FzdrAwf7eidWDQIc/scene.splinecode");
    splineRef.current = spline;
  }, []);

  return <canvas className="absolute" ref={canvasRef} />;
}

export default TubiSpline;
