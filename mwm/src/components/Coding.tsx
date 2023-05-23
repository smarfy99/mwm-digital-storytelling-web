import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const Coding = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/9JAEOKjCPjnh7DI9/scene.splinecode');
    splineRef.current = spline;
  }, []);

  return (
    <div className="flex relative w-full h-full">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};

export default Coding;
