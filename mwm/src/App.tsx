import { Route, Routes } from 'react-router-dom';

import Archive from './pages/Archive';
import Landing from './components/Landing';
import MoziCamera from './components/Camera';
import Opening from './components/Opening';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/opening" element={<Opening />} />
        <Route path="/camera" element={<MoziCamera />} />
      </Routes>
    </>
  );
};

export default App;
