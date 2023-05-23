import SpaceBack from "../components/SpaceBack";
import MoziLanding from "../components/MoziLanding";
import Introduction from "../components/Introduction";

const Landing = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <SpaceBack />
      <MoziLanding />
      <Introduction />
    </div>
  );
};

export default Landing;
