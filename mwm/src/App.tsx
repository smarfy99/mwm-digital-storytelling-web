import Archive from './pages/Archive';
import PhotoBooth from './pages/PhotoBooth';
import Landing from './components/Landing';

const App = () => {
  return (
    <>
      <div className='flex flex-col'>
        {/* <Landing /> */}
        <Landing />
        <PhotoBooth />
        {/* <Archive /> */}
      </div>
    </>
  );
};

export default App;
