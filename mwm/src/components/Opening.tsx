import { useNavigate } from 'react-router-dom';

const Opening = () => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate('/smiling');
  };

  return (
    <>
      <div className="relative w-screen h-screen ">
        <video
          autoPlay
          onClick={handleVideoClick}
          src="../../public/opening.mp4"
          className="absolute top-0 left-0 object-cover"
        />
        <source src="../../public/opening.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Opening;
