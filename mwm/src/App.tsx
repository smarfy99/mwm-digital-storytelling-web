import { useState } from 'react';

import Archive from './pages/Archive';
import Landing from './components/Landing';
import MoziCamera from './components/Camera';
import Opening from './components/Opening';
import Smiling from './components/Smiling';
import Angry from './components/Angry';
import Love from './components/Love';
import WebcamCapture from './WebcamCapture';
import { BrowserRouter, Route } from 'react-router-dom';
// import Input from './components/Input';

const App = () => {
  const [cnt, setCnt] = useState(0);

  return (
      <div>
        {decideComponent(cnt)}
        <WebcamCapture cnt={cnt} setCnt={setCnt} />
      </div>
  );
};

export default App;

const decideComponent = (cnt: number) => {
  if (cnt === 0) return <Landing />;
  if (cnt === 1) return <Opening />;
  if (cnt === 2) return <Smiling />;
  if (cnt === 3) return <Angry />;
  if (cnt === 4) return <Love />;
  // if (cnt === 5) return <MoziCamera />;
};
