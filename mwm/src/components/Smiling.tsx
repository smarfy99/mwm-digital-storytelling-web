import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Smiling = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 7초 후, sub 컴포넌트로 이동
    const timer = setTimeout(() => {
      navigate('/sub1');
    }, 7000);

    // timer unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="relative w-screen h-screen ">
        <video 
            autoPlay 
            src="../../public/high.mp4" 
            className="absolute top-0 left-0 object-cover" />
        <source src="../../public/high.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Smiling;
