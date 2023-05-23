import { useEffect, useRef } from 'react';
import { Message } from './Input';

// 외부 패키지
import TagCloud, { TagCloudOptions } from 'TagCloud';

interface DataSphereProps {
  messages: Message[];
}

const DataSphere = ({ messages }: DataSphereProps) => {
  const textArr = messages.map((message) => message.text);
  const tagCloudRef = useRef<any>(null);

  useEffect(() => {
    const container = '.tagcloud';
    const texts = textArr;
    const options: TagCloudOptions = {
      radius: 500,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      keep: true,
    };

    if (tagCloudRef.current) {
      tagCloudRef.current.update(texts);
    } else {
      tagCloudRef.current = TagCloud(container, texts, options);
    }

    return () => {
      if (tagCloudRef.current) {
        tagCloudRef.current.destroy();
        tagCloudRef.current = null;
      }
    };
  }, [messages]);
  return (
    <>
      <div className="relative top-0 flex justify-center items-center w-fit h-fit overflow-visible">
        <span className="tagcloud inline-block top-0 left-0 text-white">
          {/* <span className="tagcloud--item hover:text-blue-600"></span> */}
        </span>
      </div>
    </>
  );
};

export default DataSphere;
