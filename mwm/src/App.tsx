import { Route, Routes } from 'react-router-dom';

import Archive from './pages/Archive';
import Landing from './components/Landing';
import MoziCamera from './components/Camera';
import Opening from './components/Opening';
import Smiling from './components/Smiling';
import Sub from './components/Sub';
import Angry from './components/Angry';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/opening" element={<Opening />} />
        <Route path="/smiling" element={<Smiling />} />
        <Route path="/camera" element={<MoziCamera />} />
        <Route path="/sub" element={<Sub />} />
        <Route path="/angry" element={<Angry />} />
      </Routes>
    </>
  );
};

export default App;
