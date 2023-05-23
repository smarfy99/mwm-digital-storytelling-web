import SpaceBack from '../components/SpaceBack';
import MoziLanding from '../components/MoziLanding';
import Introduction from '../components/Introduction';
import Media from '../components/Media';
import Coding from '../components/Coding';

const Landing = () => {
  return (
    <div className="flex flex-col">
        <SpaceBack />
      {/* <div className="inset-0 flex flex-col jusify-center items-center"> */}
        <MoziLanding />
        <Introduction />
        <Media />
        <Coding />
      {/* </div> */}
    </div>
  );
};

export default Landing;
