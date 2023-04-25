import SpaceBack from "../components/SpaceBack";
import TubiSpline from "../components/Mozi";
import LandingText from "../components/LandingText";
import Loading from "../components/Loading";
import { useMemo } from "react";

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
