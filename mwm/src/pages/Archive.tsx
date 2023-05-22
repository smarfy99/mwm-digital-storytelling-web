import Input from '../components/Input';
import DataSphere from '../components/DataSphere';
import { className } from '../components/SpaceBack';

const Archive = () => {
  return (
    <div className="relative overflow-hidden w-screen h-screen flex justify-center items-center">
      <Input />
      <DataSphere />
    </div>
  );
};

export default Archive;
