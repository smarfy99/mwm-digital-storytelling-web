import SpaceBack from "../components/SpaceBack";
import TubiSpline from "../components/Mozi";
import LandingText from "../components/LandingText";

const Landing = () => {
  return (
    <div className="relative overflow-hidden w-screen h-screen flex justify-center items-center">
      <SpaceBack />
      <LandingText />
      <TubiSpline />
    </div>
  );
};

export default Landing;
