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
    const imageRef = ref(storage, 'images/mergedImage.jpg');

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
      const qrCodeData = JSON.stringify({mergedImageURL});
      qrCodeRef.current.makeCode(qrCodeData);
    }
  }, [mergedImageURL]);

  return (
    <div className="flex">
      <div className="flex w-4/6">
        {mergedImageURL ? <img src={mergedImageURL} alt="mergedImage" /> : <p>이미지 불러오는 중...</p>}
      </div>
      {/* <div className='hidden'>
        <input ref={qrCodeRef} id="text" type='text' defaultValue={mergedImageURL || ''} />
      </div> */}
      <div className='flex w-[300px] h-[300px] m-7'>
        <QRCode ref={qrCodeRef} value={mergedImageURL || ''} />
      </div>
    </div>
  );
};

export default MoziCamera;
