import SpaceBack from "../components/SpaceBack";
import Planet1 from "../components/Planet";

const Galaxy = () => {
  return (
    <div className="relative overflow-hidden w-screen h-screen flex justify-center items-center">
      <SpaceBack />
      <Planet1 />
    </div>
  );
};

export default Galaxy;
