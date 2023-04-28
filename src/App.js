import './App.css';
import Banner from './components/Banner';
import GraphDisplay from './components/GraphDisplay';

function App() {
  return (
    <>
    <Banner></Banner>
    <div className='w-full h-screen flex flex-col justify-between min-h-screen'>
      <GraphDisplay></GraphDisplay>
    </div>
    </>
    
  );
}

export default App;
