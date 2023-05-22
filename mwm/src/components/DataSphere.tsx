import { useEffect } from 'react';

// 외부 패키지
import TagCloud from 'TagCloud';

const DataSphere = ({}) => {
  useEffect(() => {
    return () => {
      const container: string = '.tagcloud';
      const texts: string[] = ['jiwon', '직우', '사랑', '안녕', '나는', '지원', '이야'];

      const options: object = {
        radius: 300,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        keep: true,
      };

      TagCloud(container, texts, options);
    };
  }, []);

  return (
    <>
      <div className="relative flex justify-center items-center w-50 h-50">
        <span className="inline-block text-white"></span>
      </div>
    </>
  );
};

export default DataSphere;
