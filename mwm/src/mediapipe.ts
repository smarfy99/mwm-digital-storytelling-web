import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
export const createGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm',
  );
  const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
  });
  return gestureRecognizer;
};
