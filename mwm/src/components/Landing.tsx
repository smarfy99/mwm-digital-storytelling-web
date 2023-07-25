import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    navigate('/opening');
  };




  useEffect(() => {
    // 비디오 클릭하고, 9초 후에 화면 이동
    let timer: NodeJS.Timeout;

    if (clicked) {
      timer = setTimeout(() => {
        navigate('/camera');
      }, 9000);
    }

    // timer unmount
    return () => clearTimeout(timer);
  }, [clicked, navigate]);

  useEffect(() => {
    //custom controls
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.controls = false; //hide default controls
    }
  });

  return (
    <>
      <div className="relative w-screen h-screen ">
        <video
          ref={videoRef}
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

export default Landing;
