import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import Spline, { SPEObject } from '@splinetool/react-spline';

const MoziLanding = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load('https://my.spline.design/iv5rZBDrjONOwvEO9lwB7ODn/').then(() => {
    });
    splineRef.current = spline;
  }, []);

  return (
    <div className="absolute w-full h-full">
      <canvas className="w-full h-full" ref={canvasRef} />
    </div>
  );
};

export default MoziLanding;
