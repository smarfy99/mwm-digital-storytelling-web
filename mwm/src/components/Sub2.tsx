import { useNavigate } from 'react-router-dom';

const Sub2 = () => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate('/love');
  };

  return (
    <>
      <div className="relative w-screen h-screen bg-black">
        <video
          autoPlay
          loop
          onClick={handleVideoClick}
          src="../../public/sub.mp4"
          className="absolute top-0 left-0 object-cover"
        />
        <source src="../../public/sub.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Sub2;
