import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate('/opening');
  };

  return (
    <>
      <div className="relative w-screen h-screen ">
        <video
          autoPlay
          loop
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
