import { useEffect } from 'react';
import { Message } from './Input';

// 외부 패키지
import TagCloud, { TagCloudOptions } from 'TagCloud';

const DataSphere = ({ messages }: { messages: Message[] }) => {
  const textArr = messages.map((message) => message.text);

  useEffect(() => {
    return () => {
      const container = '.tagcloud';
      const texts = textArr;

      const options: TagCloudOptions = {
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
