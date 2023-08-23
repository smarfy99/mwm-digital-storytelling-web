import { SetStateAction, useEffect, useRef, useState, Dispatch } from 'react';
import { createGestureRecognizer } from './mediapipe';
import { GestureRecognizer } from '@mediapipe/tasks-vision';
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export enum PAGE {
  LANDING = 0,
  OPENING,
  SMILING,
  ANGRY,
  LOVE,
}

const WebcamCapture = ({ cnt, setCnt }: { cnt: number; setCnt: Dispatch<SetStateAction<number>> }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); //렌더링되는 video태그
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //렌더링되는 canvas태그
  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | undefined>(); //제스처 만드는 친구 실행상태
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false); // 웹캠 실행상태
  const [imageList, setImageList] = useState<Blob[]>([]);
  const newStorage = storage;
  const cntRef = useRef<number>(cnt);
  const timerRef = useRef<any>(null);

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
    // if (cntRef.current === PAGE.LOVE) {
    //   const timer = setTimeout(() => {
    //     takeWebcamPhotoAndMerge();
    //   }, 9000);
    //   return () => clearTimeout(timer);
    // }
  }, [cnt]);

  useEffect(() => {
    if (webcamRunning && gestureRecognizer) {
      predictWebcam();
    }
  }, [gestureRecognizer]);

  useEffect(() => {
    cntRef.current = cnt;
    if(cnt===PAGE.LOVE){
      setTimeout(()=>{
        takePhoto();
      },8000)
    }
  }, [cnt]);

  useEffect(()=>{
if(imageList.length===4){
  mergeAndUploadImage();
}
  },[imageList])

  let lastVideoTime = -1;
  let results: any;

  //이미지 합성
  const mergeAndUploadImage = async () => {
    const canvas = document.createElement('canvas');
    //이미지를 blob에서 image 객체로 변환하여 크기 정보 얻기
    const imageObjects = await getImageObject(imageList);
    //이미지 크기 정보를 바탕으로 캔버스 크기 설정
    canvas.width = imageObjects[0].width * 2;
    canvas.height = imageObjects[0].height * 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('canvas 가져오기 실패');
    }

    imageSetting(ctx, imageObjects);

    // photoFrame 이미지를 그림
    const frameImage = new Image();
    frameImage.src = '/photoFrame.png';
    await new Promise<void>((resolve) => {
      frameImage.onload = () => {
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        // 합성된 이미지를 Firebase Storage에 업로드
        const storageRef = ref(newStorage, 'images/mergedImage.jpg');
        canvas.toBlob(
          async (blob) => {
            if (blob) {
              await uploadBytes(storageRef, blob);
              const downloadURL = await getDownloadURL(storageRef);
              console.log('Image URL:', downloadURL);
            }
            resolve();
          },
          'image/jpeg',
          0.9,
        );
      };
    });
  };

  const takePhoto = async () => {
    if (webcamRunning) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current!;
      // const canvas = document.createElement('canvas');
      canvas.width = videoRef.current?.videoWidth || 900;
      canvas.height = videoRef.current?.videoHeight || 600;

      const ctx = canvas!.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageBlob = await getImageBlob(canvas);

        if (imageBlob) {
          console.log('last', imageBlob);
          setImageList((prev) => [...prev, imageBlob]);
        }
      }
    }
  };

  const takeWebcamPhotoAndMerge = async () => {
    await takePhoto();
  };

  //이전 프레임의 주먹 상태를 boolean으로
  let lastStatus: boolean | undefined = undefined;

  const predictWebcam = async () => {
    if (videoRef.current && gestureRecognizer) {
      let nowInMs = Date.now();
      if (videoRef.current.currentTime !== lastVideoTime) {
        lastVideoTime = videoRef.current.currentTime;
        results = gestureRecognizer.recognizeForVideo(videoRef.current, nowInMs);

        const currentStatus = results?.gestures?.[0]?.[0]?.categoryName === 'Closed_Fist';
        //주먹 상태가 바뀌었을 때만 실행
        if (currentStatus !== lastStatus) {
          lastStatus = currentStatus;
          if (currentStatus && cntRef.current >= PAGE.OPENING && cntRef.current <= PAGE.LOVE) {
            if (cntRef.current === PAGE.OPENING && timerRef.current === null) {
              timerRef.current = setTimeout(async () => {
                await takePhoto();
                timerRef.current = null;
              }, 5000);
              setCnt((prev: number) => prev + 1);
            }
            if ((cntRef.current === PAGE.SMILING||cntRef.current===PAGE.ANGRY) && timerRef.current === null) {
              timerRef.current = setTimeout(async () => {
                await takePhoto();
                timerRef.current = null;
              }, 5000);
              setCnt((prev: number) => prev + 1);
            }
          }
          if (currentStatus && timerRef.current === null&&cntRef.current!=PAGE.LOVE) setCnt((prev: number) => prev + 1);
        }
      }
      if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam); // Continue calling predictWebcam
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ transform: 'scaleX(-1)' }}></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default WebcamCapture;

const imageSetting = (ctx: CanvasRenderingContext2D, imageObjects: HTMLImageElement[]) => {
  // 이미지 2x2로 배치
  let x = 0;
  let y = 0;
  const canvas = document.createElement('canvas');
  //이미지 크기 정보를 바탕으로 캔버스 크기 설정
  canvas.width = imageObjects[0].width * 2;
  canvas.height = imageObjects[0].height * 2;
  imageObjects.forEach((image) => {
    ctx.drawImage(image, x, y, image.width, image.height);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(image, -x - image.width, y, image.width, image.height);
    ctx.restore(); // 이전 캔버스 상태로 복원
    x += image.width;
    if (x >= canvas.width) {
      x = 0;
      y += image.height;
    }
  });
  return imageObjects;
};

const getImageObject = async (imageList: Blob[]) => {
  return await Promise.all(
    imageList.map(async (blob) => {
      const image = new Image();
      await new Promise((resolve) => {
        image.onload = resolve;
        image.src = URL.createObjectURL(blob);
      });
      return image;
    }),
  );
};

const getImageBlob = async (canvas: HTMLCanvasElement) => {
  return await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob: any) => {
      resolve(blob);
    });
  });
};
