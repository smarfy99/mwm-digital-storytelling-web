import React, { useRef, useEffect } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

const MoziCamera = () => {
  
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <div className="absolute w-full">
        <video className="absolute">
          <canvas className="relative"></canvas>
        </video>
      </div>
    </div>
  );
};

export default MoziCamera;
