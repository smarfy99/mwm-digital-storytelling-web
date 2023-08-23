import { useEffect, useState } from 'react';

const Angry = () => {
  const [videoSrc, setVideoSrc] = useState('/angry.mp4');
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    // 5초 후, sub 컴포넌트로 이동
    const timer = setTimeout(() => {
      setVideoSrc('/sub.mp4');
      setIsLooping(true); // sub.mp4로 변경되었을때만 루프 설정
    }, 5000);

    // timer unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="relative w-screen h-screen bg-white">
        <video autoPlay preload="auto" src={videoSrc} className="absolute top-0 left-0 object-cover" loop={isLooping} />
        <source src={videoSrc} type="video/mp4" />
      </div>
    </>
  );
};

export default Angry;
