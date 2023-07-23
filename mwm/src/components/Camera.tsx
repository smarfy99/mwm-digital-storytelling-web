import { useState, useEffect, useRef } from 'react';
import photoFrame from '../assets/photoframe.png';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

// 웹 시작
const MoziCamera = () => {
  // mergedImageURL에 이미지 URL 저장
  const [mergedImageURL, setMergedImageURL] = useState<string | null>(null);

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

  return (
    <div className="">
      <div className="">
        {mergedImageURL ? <img src={mergedImageURL} alt="mergedImage" /> : <p>이미지 불러오는 중...</p>}
        <input id="text" type="text"></input>
        <div className="w-[300px] h-[300px] mt-7"></div>
      </div>
    </div>
  );
};

export default MoziCamera;
