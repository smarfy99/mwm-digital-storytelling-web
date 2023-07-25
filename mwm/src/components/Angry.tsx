import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Angry = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 5초 후, sub 컴포넌트로 이동
    const timer = setTimeout(() => {
      navigate('/sub2');
    }, 5000);

    // timer unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="relative w-screen h-screen ">
        <video 
            autoPlay 
            src="../../public/angry.mp4" 
            className="absolute top-0 left-0 object-cover" />
        <source src="../../public/angry.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Angry;
