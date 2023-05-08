import './App.css';
import Navbar from './components/Navbar';
import GraphDisplay from './components/GraphDisplay';
import InputUSer from './components/InputUser';

function App() {
  return (
    <>
      <Navbar />
      <div class="max-w-screen-lg mx-auto px-4">
        <div className='w-full flex flex-col justify-center items-center min-h-screen'>
          <InputUSer />
        </div>
        <div className='w-full flex flex-col justify-between'>
          <GraphDisplay />
        </div>
      </div>
    </>
    
  );
}

export default App;
