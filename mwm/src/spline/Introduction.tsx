import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const Introduction = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/EBOkSflju5iY9kIX/scene.splinecode');
    splineRef.current = spline;
  }, []);

  return (
    <div className="flex relative w-screen h-screen">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};

export default Introduction;
