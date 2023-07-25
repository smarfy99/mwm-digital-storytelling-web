import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Love = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<boolean>(false);

  const handleVideoClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    // 5초 후, camera 컴포넌트로 이동
    const timer = setTimeout(() => {
      navigate('/camera');
    }, 5000);

    // timer unmount
    return () => clearTimeout(timer);
  }, [clicked, navigate]);

  return (
    <>
      <div className="relative w-screen h-screen bg-black">
        <video
          autoPlay
          onClick={handleVideoClick}
          src="../../public/heart.mp4"
          className="absolute top-0 left-0 object-cover"
        />
        <source src="../../public/heart.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Love;
