import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown-light.css';
import remarkGfm from 'remark-gfm';


function Documentation() {
    const DOC_SRC = 'https://raw.githubusercontent.com/OnlinePrivacyPilot/OnlinePrivacyPilot_UserDoc/master/DOC.md';
    const [responseStatus, setResponseStatus] = useState(null);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(DOC_SRC)
            .then(response => {
                setResponseStatus(response.status);
                setData(response.data);
            })
            .catch(error => {
                setError(true);
            });
    }, []);
    return (
        <div className='min-h-[90vh] py-16 px-4'>
            <div className='rounded-lg border-2 border-solid border-zinc-300 p-12'>
                {error ? (
                    <p>Unable to load documentation from the <a href={DOC_SRC}>Git repository</a>.</p>
                ) : (
                    responseStatus === 200 ? (
                        <div className='markdown-body'>
                            <ReactMarkdown children={data} remarkPlugins={[remarkGfm]} />
                        </div>
                    ) : (
                        <div className='flex'>
                            <svg className='animate-spin h-5 w-5 mr-3' viewBox="0 0 24 24">
                                <circle cx='12' cy='12' r='10' stroke='currentColor' fillOpacity='0' strokeOpacity='0.25' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                            <p>Loading documentation ...</p>
                        </div>
                    )
                )
                }
            </div>
        </div>
    );
}

export default Documentation;