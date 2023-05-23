// import { useEffect, useRef } from 'react';
// import { Application } from '@splinetool/runtime';

// const MoziLanding = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const splineRef = useRef<Application | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     const spline = new Application(canvas);

//     spline.load('https://prod.spline.design/a5OorMZ5p8k8H9em/scene.splinecode');
//     splineRef.current = spline;

//     const handleScroll = (e: Event) => {
//       const containerElement = e.target as HTMLDivElement;
//       // // 스크롤 위치를 감지하고 애니메이션을 조작하는 로직을 작성합니다.
//       // const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//       // // 애니메이션 조작 로직 예시: 스크롤 위치에 따라 애니메이션 프레임을 갱신합니다.
//       // if (splineRef.current) {
//       //   splineRef.current.updateAnimation(scrollTop);
//       // }
//     };

//     const containerElement = containerRef.current;
//     if (containerElement) {
//       containerElement.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (containerElement) {
//         containerElement.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, []);

//   return (
//     <div className="absolute w-full h-full overflow-auto" ref={containerRef}>
//       <canvas className="w-full h-full" ref={canvasRef} />
//     </div>
//   );
// };

// export default MoziLanding;
import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const MoziLanding = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/y8woy-r5k15bRDAC/scene.splinecode');
    splineRef.current = spline;
  }, []);

  return (
    <div className="absolute w-full h-full">
      <canvas className="w-fit h-fit" ref={canvasRef} />
    </div>
  );
};

export default MoziLanding;
