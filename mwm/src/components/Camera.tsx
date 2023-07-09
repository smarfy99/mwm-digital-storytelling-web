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

// const Camera = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const videoElement = videoRef.current;
//     const canvasElement = canvasRef.current;
//     const canvasCtx = canvasElement.getContext('2d');

//     function onResults(results) {
//       canvasCtx.save();
//       canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//       canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
//       if (results.multiHandLandmarks) {
//         for (const landmarks of results.multiHandLandmarks) {
//           drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
//           drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
//         }
//       }
//       canvasCtx.restore();
//     }

//     const hands = new Hands({
//       locateFile: (file) => {
//         return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
//       },
//     });

//     hands.setOptions({
//       maxNumHands: 2,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });

//     hands.onResults(onResults);

//     const camera = new Camera(videoElement, {
//       onFrame: async () => {
//         await hands.send({ image: videoElement });
//       },
//       width: 1280,
//       height: 720,
//     });

//     camera.start();

//     return () => {
//       camera.stop();
//       hands.close();
//     };
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <video ref={videoRef} className="input_video" width="1280" height="720" autoPlay></video>
//       <canvas ref={canvasRef} className="output_canvas" width="1280" height="720"></canvas>
//     </div>
//   );
// };

export default MoziCamera;
