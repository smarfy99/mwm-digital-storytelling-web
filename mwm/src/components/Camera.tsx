import photoFrame from '../assets/photoframe.png';
import admin from 'firebase-admin';
const { createCanvas, loadImage } = require('canvas');

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
