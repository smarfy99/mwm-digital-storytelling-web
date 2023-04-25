import SpaceBack from "../components/SpaceBack";
import MoziSpline from "../components/Mozi";
import LandingText from "../components/LandingText";

const Landing = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <SpaceBack />
      <LandingText />
      <MoziSpline />
    </div>
  );
};

export default Landing;
