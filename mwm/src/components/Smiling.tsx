import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Smiling = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    setClicked(true);
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  // useEffect(() => {
  //   // 5초 후, camera 컴포넌트로 이동
  //   const timer = setTimeout(() => {
  //     navigate('/camera');
  //   }, 5000);

  //   // timer unmount
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  useEffect(() => {
    // 비디오 클릭하고, 9초 후에 화면 이동
    let timer: NodeJS.Timeout;

    if (clicked) {
      timer = setTimeout(() => {
        navigate('/sub');
      }, 7000);
    }

    // timer unmount
    return () => clearTimeout(timer);
  }, [clicked, navigate]);


  return (
    <>
      <div className="relative w-screen h-screen ">
        <video
          onClick={handleVideoClick}
          src="../../public/high.mp4"
          className="absolute top-0 left-0 object-cover"
        />
        <source src="../../public/high.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Smiling;
