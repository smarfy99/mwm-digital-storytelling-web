// import { GestureRecognizer, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

// const demosSection = document.getElementById('demos');
// let gestureRecognizer: GestureRecognizer;
// let runningMode = 'IMAGE';
// let enableWebcamButton: HTMLButtonElement;
// let webcamRunning: Boolean = false;
// const videoHeight = '360px';
// const videoWidth = '480px';

// const createGestureRecognizer = async () => {
//   const vision = await FilesetResolver.forVisionTasks(
//     'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm',
//   );
//   gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
//     baseOptions: {
//       modelAssetPath:
//         'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
//       delegate: 'GPU',
//     },
//     runningMode : runningMode,
//   });
//   demosSection.classList.remove('invisible');
// };
// createGestureRecognizer();
