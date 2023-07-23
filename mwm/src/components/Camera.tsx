import photoFrame from '../assets/photoframe.png';

// 웹 시작
const MoziCamera = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <div className="absolute w-full">
        <img src={photoFrame} alt="photoFrame"></img>
      </div>
    </div>
  );
};

export default MoziCamera;
