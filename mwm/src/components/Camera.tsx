import React, { useRef, useEffect } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import photoFrame from '../assets/photoframe.png';

const MoziCamera = () => {
  
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <div className="absolute w-full">
        <img src={photoFrame} alt="photoFrame"></img>
        {/* <video className="absolute">
          <canvas className="relative"></canvas>
        </video> */}
      </div>
    </div>
  );
};

export default MoziCamera;
