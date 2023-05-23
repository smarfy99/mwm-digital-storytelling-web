import Archive from './pages/Archive';
import Landing from './pages/Landing';

const App = () => {
  return (
    <>
      <div className='flex flex-col'>
        <Landing />
        {/* <Galaxy /> */}
        <Archive />
      </div>
    </>
  );
};

export default App;
