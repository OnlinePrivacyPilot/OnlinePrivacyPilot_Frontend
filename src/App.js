import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';
import { DisplayResults } from './components/DisplayResults';
import SearchForm from './components/SearchForm';
import { FingerprintsProvider } from './contexts/FingerprintsContext';
import { FiltersProvider } from './contexts/FiltersContext';

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
        <>
            <Navbar />
            <div className="max-w-screen-lg mx-auto px-4">
                <FingerprintsProvider>
                    <FiltersProvider>
                    {error ? (
                            <p>API endpoint is down. Please check if the OPP backend is launched properly.</p>
                        ) : (
                            responseStatus === 200 ? (
                            <SearchForm />
                        ) : (
                            <p>Loading...</p>
                        )
                    )}
                        <DisplayResults/>
                    </FiltersProvider>
                </FingerprintsProvider>
            </div>
        </>
    );
}

export default App;
