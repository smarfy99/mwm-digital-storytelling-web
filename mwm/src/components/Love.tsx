import { useState, useEffect } from 'react';
import MoziCamera from './Camera';

const Love = () => {
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    // 5초 후, sub 컴포넌트로 이동
    const timer = setTimeout(() => {
      setShowCamera(true);
    }, 9000);

    // timer unmount
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="relative w-screen h-screen bg-white">
        {showCamera ? (
          <MoziCamera />
        ) : (
          <>
            <video autoPlay preload="auto" src="/heart.mp4" className="absolute top-0 left-0 object-cover" />
            <source src="/heart.mp4" type="video/mp4" />
          </>
        )}
      </div>
    </>
  );
};

export default Love;
