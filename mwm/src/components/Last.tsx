import { useState, useEffect, useRef } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useRecoilValue } from 'recoil';
import { time } from '../atom/currentTime';
import { done } from '../atom/currentTime';

const Last = () => {
  const [mergedImageURL, setMergedImageURL] = useState<string | null>(null);
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
  return (
    <div className="relative justify-center items-center bg-white">
      {mergedImageURL ? (
        <img src={mergedImageURL} alt="mergedImage" className="w-2/5 inset-y-72 inset-x-32 absolute" />
      ) : (
        <p>image loading</p>
      )}
    </div>
  );
};

export default Last;
