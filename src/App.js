import './App.css';
import Navbar from './components/Navbar';
import GraphDisplay from './components/GraphDisplay';
import UserInput from './components/UserInput';

function App() {
  return (
    <>
      <Navbar />
      <div class="max-w-screen-lg mx-auto px-4">
          <UserInput />
          <GraphDisplay />
      </div>
    </>
    
  );
}

export default App;
