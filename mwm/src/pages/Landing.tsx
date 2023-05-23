import SpaceBack from "../components/SpaceBack";
import MoziLanding from "../components/MoziLanding";
import Introduction from "../components/Introduction";
import Media from "../components/Media";
import Coding from "../components/Coding";

const Landing = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center">
      <SpaceBack />
      <MoziLanding />
      <Introduction />
      <Media />
      <Coding />
    </div>
  );
};

export default Landing;
