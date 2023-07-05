import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';
import { DisplayResults } from './components/DisplayResults';
import SearchForm from './components/SearchForm';
import Documentation from './components/Documentation';
import About from './components/About';
import { FingerprintsProvider } from './contexts/FingerprintsContext';
import { FiltersProvider } from './contexts/FiltersContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [responseStatus, setResponseStatus] = useState(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/status')
            .then(response => {
                setResponseStatus(response.status);
            })
            .catch(error => {
                setError(true);
            });
    }, []);
    return (
        <Router>
            <Navbar />

            <div className="max-w-screen-lg mx-auto px-4">
                <FingerprintsProvider>
                    <FiltersProvider>

                                <Routes>
                                    <Route path="/" element={
                                        error ? (
                                            <p>API endpoint is down. Please check if the OPP backend is launched properly.</p>
                                        ) : (
                                            responseStatus === 200 ? (
                                                <>
                                                    <SearchForm />
                                                    <DisplayResults />                                                
                                                </>
                                            ) : (
                                                <div className='flex'>
                                                    <svg className='animate-spin h-5 w-5 mr-3' viewBox="0 0 24 24">
                                                        <circle cx='12' cy='12' r='10' stroke='currentColor' fillOpacity='0' strokeOpacity='0.25' strokeWidth='4'></circle>
                                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                    </svg>
                                                    <p>Loading app ...</p>
                                                </div>
                                            )
                                        )} />
                                    <Route path="/documentation" element={<Documentation />} />
                                    <Route path="/about" element={<About />} />
                                </Routes>
                    </FiltersProvider>
                </FingerprintsProvider>
            </div>
        </Router>
    );
}

export default App;
