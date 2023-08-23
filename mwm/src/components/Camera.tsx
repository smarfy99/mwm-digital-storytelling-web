import { useState, useEffect, useRef } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import QRCode from 'qrcode.react';

// 웹 시작
const MoziCamera = () => {
  // mergedImageURL에 이미지 URL 저장
  const [mergedImageURL, setMergedImageURL] = useState<string | null>(null);
  const qrCodeRef = useRef<any>(null);

  useEffect(() => {
    // Firebase Storage에서 이미지 불러오기
    const newStorage = storage;
    const imageRef = ref(newStorage, 'images/mergedImage.jpg');

    getDownloadURL(imageRef)
      .then((url) => {
        setMergedImageURL(url);
      })
      .catch((error) => {
        console.error('이미지 불러오기 실패 : ', error);
      });
  }, []);

  useEffect(() => {
    if (qrCodeRef.current && mergedImageURL) {
      // QR 코드 생성
      const qrCodeData = JSON.stringify({ mergedImageURL });
      qrCodeRef.current.makeCode(qrCodeData);
    }
  }, [mergedImageURL]);

  return (
    <div className="relative justify-center items-center bg-white">
      <img src="/oziBack.png" alt="mozi" className="relative w-screen" />

      {mergedImageURL ? (
        <img src={mergedImageURL} alt="mergedImage" className="w-2/5 inset-y-72 inset-x-32 absolute" />
      ) : (
        <p>이미지 불러오는 중...</p>
      )}

      <div className="absolute top-72 right-60">
        {mergedImageURL && (
          <QRCode
            ref={qrCodeRef}
            level={'M'}
            value={mergedImageURL || ''}
            size={300}
            bgColor='transparent'
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
