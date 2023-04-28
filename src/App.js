import './App.css';
import Banner from './components/Banner';
import GraphDisplay from './components/GraphDisplay';
import InputUSer from './components/InputUser';

function App() {
  return (
    <>
    <Banner></Banner>
    <div className='flex w-full flex-col justify-center items-center min-h-screen'>
      <InputUSer></InputUSer>
    </div>
    <div className='w-full flex flex-col justify-between'>
      <GraphDisplay></GraphDisplay>
    </div>
    </>
    
  );
}

export default App;
