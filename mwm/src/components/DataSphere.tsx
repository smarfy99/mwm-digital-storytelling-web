import { useEffect, useRef } from 'react';
import { Message } from './Input';

// 외부 패키지
import TagCloud, { TagCloudOptions } from 'TagCloud';

interface DataSphereProps {
  messages: Message[];
}

const DataSphere = ({ messages }: DataSphereProps) => {
  // const textArr = messages.map((message) => message.text);
  // const tagCloudRef = useRef<TagCloud | null>(null);

  const textArr = useRef<string[]>([]);

  useEffect(() => {
    const container = '.tagcloud';

    // Update textArr when messages change
    textArr.current = messages.map((message) => message.text);

    // Destroy previous tag cloud instance
    const prevTagCloud = TagCloud(container, textArr.current);
    prevTagCloud.destroy();

    // Create new tag cloud instance
    const options: TagCloudOptions = {
      radius: 300,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      keep: true,
    };

    TagCloud(container, textArr.current, options);
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
