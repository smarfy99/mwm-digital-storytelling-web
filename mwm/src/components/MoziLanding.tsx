import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const MoziLanding = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/a5OorMZ5p8k8H9em/scene.splinecode');
    splineRef.current = spline;
  }, []);

  return (
    <div className="absolute w-full h-full">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};

export default MoziLanding;
