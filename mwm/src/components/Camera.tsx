import { useState, useEffect, useRef } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import QRCode from 'qrcode';

// 웹 시작
const MoziCamera = () => {
  // mergedImageURL에 이미지 URL 저장
  const [mergedImageURL, setMergedImageURL] = useState<string | null>(null);
  const mergedImageURLRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Firebase Storage에서 이미지 불러오기
    const imageRef = ref(storage, 'images/mergedImage.jpg');

    getDownloadURL(imageRef)
      .then((url) => {
        setMergedImageURL(url);

        // 이미지 url을 input 창에 자동으로 입력
        if (mergedImageURLRef.current) {
          mergedImageURLRef.current.value = url;
        }
      })
      .catch((error) => {
        console.error('이미지 불러오기 실패 : ', error);
      });

      // QR 코드 생성
      const qrCodeEl = document.getElementById('qrcode');
      if (qrCodeEl && mergedImageURLRef.current) {
        const qrcode = new QRCode(qrCodeEl);
        qrcode.makeCode(mergedImageURLRef.current.value);
      }
  }, []);

  return (
    <div className="flex">
      <div className="flex">
        {mergedImageURL ? <img src={mergedImageURL} alt="mergedImage" /> : <p>이미지 불러오는 중...</p>}
        <div className='hidden'>
          <input ref={mergedImageURLRef} id="text" type="text"></input>
        </div>
        <div className="flex w-[300px] h-[300px] mt-7" id='qrcode'></div>
      </div>
    </div>
  );
};

export default MoziCamera;
