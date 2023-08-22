import { SetStateAction, useEffect, useRef, useState, Dispatch } from 'react';
import { createGestureRecognizer } from './mediapipe';
import { GestureRecognizer } from '@mediapipe/tasks-vision';
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytes, listAll } from 'firebase/storage';
import mergeImages from 'merge-images';

const WebcamCapture = ({ cnt, setCnt }: { cnt: number; setCnt: Dispatch<SetStateAction<number>> }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); //렌더링되는 video태그
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //렌더링되는 canvas태그

  const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | undefined>(); //제스처 만드는 친구 실행상태
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false); // 웹캠 실행상태
  const [imageList, setImageList] = useState<Blob[]>([]);

  const newStorage = storage;

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

  //이미지 불러오기
  // useEffect(() => {
  //   if (cnt >= 5) {
  //     listAll(imageListRef).then((response) => {
  //       response.items.forEach((item, index) => {
  //         if (1 <= index && index < 5) {
  //           getDownloadURL(item).then((url) => {
  //             setImageList((prev) => [...prev, url]);
  //           });
  //         }
  //       });
  //     });
  //   }
  // }, [cnt]);

  let lastVideoTime = -1;
  let results: any;

  //이미지 합성
  const mergeAndUploadImage = async (imageList: Blob[]) => {
    const canvas = document.createElement('canvas');
    console.log("이미지 합성");
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

    //이미지 2x2로 합성
    await mergeImages(imageObjects, {
      width: canvas.width,
      height: canvas.height,
    });

    //PhotoFrame 이미지를 그림
    const frameImage = new Image();
    frameImage.src = 'photoFrame.png';
    await frameImage.decode();

    ctx.scale(-1, 1); //이미지를 좌우반전
    ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

    //합성된 이미지를 Firebase Storage에 업로드
    const storageRef = ref(newStorage, 'images/mergedImage.jpg');

    //캔버스 내용을 Blob으로 변환
    canvas.toBlob(async (blob) => {
      if (blob) {
        //이미지 업로드
        await uploadBytes(storageRef, blob);

        //업로드된 이미지의 다운로드 URL 얻기
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image URL: ', downloadURL);
      }
    });
  };

  if (cnt === 5) {
    mergeAndUploadImage(imageList);
  }

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
              if (canvasContext && cnt > 1 && cnt < 6) {
                canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height); //canvas에 capture
                const imageBlob = await new Promise<Blob | null>((resolve) => {
                  canvas.toBlob((blob) => {
                    resolve(blob);
                  });
                });
                //여기서 imageBlob 사용가능
                if (imageBlob) {
                  console.log(imageBlob);
                  setImageList(() => [...imageList, imageBlob]); //imageBlob 추가
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
