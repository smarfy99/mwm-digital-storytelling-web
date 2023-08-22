import { useEffect, useState } from 'react';

const Angry = () => {
  const [videoSrc, setVideoSrc] = useState('/angry.mp4');

  useEffect(() => {
    // 5초 후, sub 컴포넌트로 이동
    const timer = setTimeout(() => {
      setVideoSrc('/sub.mp4');
    }, 5000);

    // timer unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="relative w-screen h-screen bg-black">
        <video autoPlay src={videoSrc} className="absolute top-0 left-0 object-cover" />
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Angry;
