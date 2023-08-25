import { useState, useEffect, useRef } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import QRCode from 'qrcode.react';
import { useRecoilValue } from 'recoil';
import { time } from '../atom/currentTime';
import { done } from '../atom/currentTime';

// 웹 시작
const MoziCamera = () => {
  // mergedImageURL에 이미지 URL 저장
  const [mergedImageURL, setMergedImageURL] = useState<string | null>(null);
  const qrCodeRef = useRef<any>(null);
  const currentTime = useRecoilValue(time);
  const doneValue = useRecoilValue(done);

  useEffect(() => {
    const fetchImageURL = async () => {
      // Firebase Storage에서 이미지 불러오기
      const newStorage = storage;
      const imageRef = ref(newStorage, `images/mergedImage${currentTime}.jpg`);

      try {
        if (doneValue) {
          const url = await getDownloadURL(imageRef);
          setMergedImageURL(url);
        }
      } catch (error) {
        console.error('이미지 불러오기 실패 : ', error);
      }
    };
    fetchImageURL();
  }, [currentTime, doneValue]);

  useEffect(() => {
    if (qrCodeRef.current && mergedImageURL) {
      // QR 코드 생성
      const qrCodeData = JSON.stringify({ mergedImageURL });
      qrCodeRef.current.makeCode(qrCodeData);
    }
  }, [mergedImageURL]);

  // useEffect(() => {
  //   // 5초 후, sub 컴포넌트로 이동
  //   const timer = setTimeout(() => {
  //     window.location.href = '/';
  //   }, 20000);

  //   // timer unmount
  //   return () => clearTimeout(timer);
  // }, []);

  const [isModal, setIsModal] = useState(false);

  const handleModalOpen = () => {
    if (mergedImageURL) {
      // Open a new window with the image URL
      window.open(mergedImageURL, '_blank', 'width=800,height=600,resizable=yes');
    }
  };

  return (
    <div className="relative justify-center items-center bg-white">
      <img src="/oziBack.png" alt="mozi" className="relative w-screen" />

      {mergedImageURL ? (
        <img
          src={mergedImageURL}
          onClick={handleModalOpen}
          alt="mergedImage"
          className="w-2/5 inset-y-96 inset-x-40 absolute"
        />
      ) : (
        <p>image loading</p>
      )}

      <div className="absolute top-96 right-96">
        {mergedImageURL && (
          <QRCode
            ref={qrCodeRef}
            level={'M'}
            value={mergedImageURL || ''}
            size={400}
            bgColor="transparent"
            imageSettings={{
              src: '/mozii.png',
              x: undefined,
              y: undefined,
              height: 100,
              width: 200,
              excavate: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MoziCamera;
