import { useEffect } from 'react';
import { Message } from './Input';

// 외부 패키지
import TagCloud from 'TagCloud';

const DataSphere = ({ message }: { message: Message }) => {
  const { name, text, timestamp } = message;
  useEffect(() => {
    return () => {
      const container: string = '.tagcloud';
      const texts: string[] = [text];
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
      <div className="relative top-0 flex justify-center items-center w-52 h-52">
        <div className="tagcloud inline-block top-0 left-0 text-white hover:text-blue-600"></div>
      </div>
    </>
  );
};

export default DataSphere;
