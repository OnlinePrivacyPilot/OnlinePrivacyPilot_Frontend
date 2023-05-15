import './App.css';
import Navbar from './components/Navbar';
import GraphDisplay from './components/GraphDisplay';
import SearchForm from './components/SearchForm';
import { FingerprintsProvider } from './contexts/FingerprintsContext';

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4">
          <FingerprintsProvider>
            <SearchForm />
            <GraphDisplay />
          </FingerprintsProvider>
      </div>
    </>
    
  );
}

export default App;
