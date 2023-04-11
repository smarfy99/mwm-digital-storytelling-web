import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";
import SpaceBackground from "./SpaceBackground";

function TubiSpline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load("https://prod.spline.design/Cu4SnAjggQUsPaK4/scene.splinecode");
    splineRef.current = spline;
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      {/* <SpaceBackground /> */}
    </div>
  );
}

export default TubiSpline;
