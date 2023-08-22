import { SetStateAction, useEffect, useRef, useState, Dispatch } from 'react';
import { createGestureRecognizer } from './mediapipe';
import { GestureRecognizer } from '@mediapipe/tasks-vision';
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import mergeImages from 'merge-images';

const WebcamCapture = ({ cnt, setCnt }: { cnt: number; setCnt: Dispatch<SetStateAction<number>> }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); //렌더링되는 video태그
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //렌더링되는 canvas태그

  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | undefined>(); //제스처 만드는 친구 실행상태
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false); // 웹캠 실행상태
  const [imageList, setImageList] = useState<Blob[]>([]);
  const newStorage = storage;
  const cntRef = useRef<number>(cnt);

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
    if (cnt === 4) {
      const timer = setTimeout(() => {
        takeWebcamPhotoAndMerge();
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, [cnt]);
  
  useEffect(() => {
    if (webcamRunning && gestureRecognizer) {
      predictWebcam();
    }
  }, [gestureRecognizer]);


  useEffect(() => {
    cntRef.current = cnt;
  }, [cnt]);

  let lastVideoTime = -1;
  let results: any;

  //이미지 합성
  const mergeAndUploadImage = async (imageList: Blob[]) => {
    console.log(imageList)
    const canvas = document.createElement('canvas');
    //이미지를 blob에서 image 객체로 변환하여 크기 정보 얻기
    const imageObjects = await Promise.all(
      imageList.map(async (blob) => {
        const image = new Image();
        await new Promise((resolve) => {
          image.onload = resolve;
          image.src = URL.createObjectURL(blob);
        });
        return image;
      }),
    );

    //이미지 크기 정보를 바탕으로 캔버스 크기 설정
    canvas.width = imageObjects[0].width * 2;
    canvas.height = imageObjects[0].height * 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('canvas 가져오기 실패');
    }
    console.log(imageObjects)
    //이미지 2x2로 합성
    await mergeImages(imageObjects.map(img=>img.src), {
      width: canvas.width,
      height: canvas.height,
    }).then((mergedImage) => {
      const img = new Image();
      img.src = mergedImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //photoFrame 이미지를 그림
        const frameImage = new Image();
        frameImage.src = '/photoFrame.png';
        frameImage.onload = async () => {
          await ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

          // 합성된 이미지를 Firebase Storage에 업로드
          const storageRef = ref(newStorage, 'images/mergedImage.jpg');
          canvas.toBlob(
            async (blob) => {
              if (blob) {
                // 이미지 업로드
                await uploadBytes(storageRef, blob);

                // 업로드된 이미지의 다운로드 URL 얻기
                const downloadURL = await getDownloadURL(storageRef);
                console.log('Image URL: ', downloadURL);
              }
            },
            'image/jpeg',
            0.9,
          );
        };
      };
    }).catch(err=>console.log(err));
  };


  const takeWebcamPhotoAndMerge = async () => {
    if (webcamRunning) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current!;
      // const canvas = document.createElement('canvas');
      canvas.width = videoRef.current?.videoWidth || 640;
      canvas.height = videoRef.current?.videoHeight || 480;

      const ctx = canvas!.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageBlob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob);
          });
        });

        if (imageBlob) {
          console.log("last",imageBlob)
          mergeAndUploadImage([...imageList, imageBlob]);
        }
      }
    }
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

          if (currentStatus) {
            const canvas = canvasRef.current;
            const video = videoRef.current;

            if (canvas && video) {
              const canvasContext = canvas.getContext('2d');
              if (canvasContext && cntRef.current >= 1 && cntRef.current < 5) {
                console.log(cntRef.current)
                canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height); //canvas에 capture
                const imageBlob = await new Promise<Blob | null>((resolve) => {
                  canvas.toBlob((blob) => {
                    resolve(blob);
                  });
                });
                console.log(imageBlob)
                //여기서 imageBlob 사용가능
                if (imageBlob) {
                  console.log(imageBlob); //실험
                  setImageList((prev) => [...prev, imageBlob]); //imageBlob 추가
                }
              }
            }
            setCnt((prev: number) => prev + 1);
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
      <video ref={videoRef} autoPlay style={{ transform: 'scaleX(-1)' }}></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default WebcamCapture;

