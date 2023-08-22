import { useNavigate } from 'react-router-dom';

const Opening = () => {
  return (
    <>
      <div className="relative w-screen h-screen bg-black">
        <video
          autoPlay
          src="/opening.mp4"
          className="absolute top-0 left-0 object-cover"
        />
        <source src="/opening.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Opening;
