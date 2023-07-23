import { useState, useEffect } from 'react';
import photoFrame from '../assets/photoframe.png';
import { storage } from '../firebase';

// 웹 시작
const MoziCamera = () => {


  return (
    <div className="">
      <div className="">
        <img src={photoFrame} alt="photoFrame"></img>
      </div>
    </div>
  );
};

export default MoziCamera;
