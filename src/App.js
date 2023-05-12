import './App.css';
import Navbar from './components/Navbar';
import GraphDisplay from './components/GraphDisplay';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4">
          <SearchForm />
          <GraphDisplay />
      </div>
    </>
    
  );
}

export default App;
