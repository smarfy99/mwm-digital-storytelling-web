import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

function TubiSpline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline
      .load("https://prod.spline.design/jJtbPNJ5eiI02XlS/scene.splinecode")
      .then(() => {
        const obj = spline.findObjectByName("eyes")!;
        spline.addEventListener("mouseHover", (e) => {
          if (e.target.name === "eyes") {
            obj.position.y += 30;
          }
        });
      });
    splineRef.current = spline;
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
}

export default TubiSpline;
