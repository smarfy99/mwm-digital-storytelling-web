import { useEffect, useRef, useState } from 'react';
import { createGestureRecognizer } from './mediapipe';
import { GestureRecognizer } from '@mediapipe/tasks-vision';
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytes, listAll } from 'firebase/storage';

const WebcamCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); //렌더링되는 video태그
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //렌더링되는 canvas태그

  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | undefined>(); //제스처 만드는 친구 실행상태
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false); // 웹캠 실행상태
  const [imageList, setImageList] = useState<String[]>([]);

  let cnt = 0;
  const newStorage = storage;
  const imageListRef = ref(newStorage, 'images/');

  useEffect(() => {
    const initializeCamera = async () => {
      //웹캠 켜고, 제스쳐 만드는 라이브러리 initialize
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        }); //웹캠 스트림
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setWebcamRunning(true);

          const recognizer = await createGestureRecognizer();
          setGestureRecognizer(recognizer);
        }
      } catch (error) {
        console.error('Error initializing camera:', error);
      }
    };
    initializeCamera();
  }, []);

  useEffect(() => {
    if (webcamRunning && gestureRecognizer) {
      predictWebcam();
    }
  }, [gestureRecognizer]);

  useEffect(() => {
    if(cnt >= 5){
      listAll(imageListRef).then((response) => {
        response.items.forEach((item,index) => {
          if( 1 <= index && index < 5){
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, url]);
            })
          }
        })
      })
    }
  }, [cnt])

  let lastVideoTime = -1;
  let results: any;

  const uploadImageToFirebaseStorage = async (blob: Blob, cnt: number) => {
    try {
      const imageRef = ref(newStorage, `images/image${cnt}.png`); // Firebase Storage의 루트 참조
      uploadBytes(imageRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const predictWebcam = async () => {
    if (videoRef.current && gestureRecognizer) {
      let nowInMs = Date.now();
      cnt = 0;
      if (videoRef.current.currentTime !== lastVideoTime) {
        lastVideoTime = videoRef.current.currentTime;
        results = gestureRecognizer.recognizeForVideo(videoRef.current, nowInMs);
        if (results && results?.gestures?.[0]?.[0]?.categoryName === 'Closed_Fist') {
          const canvas = canvasRef.current;
          const video = videoRef.current;

          if (canvas && video) {
            const canvasContext = canvas.getContext('2d');
            if (canvasContext) {
              canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height); //canvas에 capture
              const imageBlob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob((blob) => {
                  resolve(blob);
                });
              });
              //여기서 imageBlob 사용가능
              if (imageBlob) {
                cnt++;
                //이미지 Blob을 파이어베이스 스토리지에 업로드
                const imageURL = await uploadImageToFirebaseStorage(imageBlob, cnt);
                //imageURL을 활용한 추가 작업 수행 가능
              }
            }
          }
        }
      }
      if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam); // Continue calling predictWebcam
      }
    }
  };



  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default WebcamCapture;
