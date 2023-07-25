import { Route, Routes } from 'react-router-dom';

import Archive from './pages/Archive';
import PhotoBooth from './pages/PhotoBooth';
import Landing from './components/Landing';
import MoziCamera from './components/Camera';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path='/camera' element={<MoziCamera />}></Route>
      </Routes>
    </>
  );
};

export default App;
