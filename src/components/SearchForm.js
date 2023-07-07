import { useEffect, useState } from 'react';
import { TargetProvider, useTarget } from '../contexts/TargetContext'
import { useFilters, useFiltersDispatch } from '../contexts/FiltersContext'
import { SearchParametersProvider, useSearchParameters } from '../contexts/SearchParametersContext';
import { useFingerprintsDispatch } from '../contexts/FingerprintsContext';
import axios from 'axios'

export default function SearchForm() {
    return (
        <TargetProvider>
            <SearchParametersProvider>
                <div className='min-h-[90vh] py-16 px-4'>
                    <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 flex flex-wrap'>
                        <div className='inline space-y-8 p-4 basis-full lg:basis-3/4 max-w-full'>
                            <AddTarget />
                            <AddFilter />
                            <FiltersList />
                            <SearchParameters />
                        </div>
                        <div className='p-4 lg:pt-64 basis-full lg:basis-1/4 text-center'>
                            <SearchButton />
                        </div>
                    </div>
                </div>
            </SearchParametersProvider>
        </TargetProvider>
    )
}

function AddFilter() {
    const [value, setValue] = useState('');
    const [type,] = useState('name');
    const [positive, setPositive] = useState(1);
    const dispatch = useFiltersDispatch();
    const nextId = useFilters().length;
    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>Here you can specify filters to improve the relevance of the search, positive filters are used to select a subset of results and negative filters are used to exclude a subset of results.</Hint>
                <div className="font-medium truncate text-zinc-900">
                    Add filter
                </div>
            </div>
            <div className='flex gap-4'>
                <div className="flex-1 relative rounded-md shadow-sm">
                    <input
                        className="block w-full rounded-md py-2 pl-4 pr-24 text-zinc-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                        placeholder="John Doe"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <select
                            id="otherFilterPositive"
                            name="otherFilterPositive"
                            className="h-full rounded-l-md rounded-r-md text-sm border-2 border-r-1 border-zinc-400 bg-zinc-300 py-0 px-2 text-zinc-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            defaultValue={1}
                            onChange={e => setPositive(+e.target.value)}
                        >
                            <option value={1}>Positive</option>
                            <option value={0}>Negative</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center'>
                    <ActionButton
                        actionType='add'
                        action={() => {
                            setValue('');
                            dispatch({
                                op: 'add',
                                id: nextId,
                                value: value,
                                type: type,
                                method: "user_input",
                                positive: positive
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    )
}


function AddTarget() {
    const { targetValue: [targetValue, setTargetValue], targetState: [targetValid, setTargetValid] } = useTarget();

    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>Here you have to specify the target, i.e. a piece of information that characterizes you and that will be used as a starting point for the search.</Hint>
                <div className="font-medium truncate text-zinc-900">
                    Target
                </div>
            </div>
            <div className="relative rounded-lg shadow-sm">
                <input
                    type="text"
                    name="mainFilterValue"
                    id="mainFilterValue"
                    className="block w-full text-xl rounded-lg py-4 pl-4 pr-4 text-zinc-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                    placeholder="John Doe"
                    onChange={e => {
                        setTargetValue(e.target.value)
                    }}
                />
            </div>
            <div className={`${targetValid === false && (targetValue === undefined || targetValue === '') ? 'visible' : 'invisible'} p-2 text-sm text-yellow-600 border border-2 border-yellow-600 rounded-md bg-yellow-50`}>
                You must provide a target, for example: "Jane Doe".
            </div>
        </div>
    )
}

function FiltersList() {
    const filters = useFilters();
    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>Here will be displayed the list of filters that you have provided manually and from the results in the graph. The positive filters are circled in green and the negative ones in red.</Hint>
                <div className="font-medium truncate text-zinc-900">
                    Current filters
                </div>
            </div>
            <div>
                <div className='border-2 px-4 border-zinc-400 rounded-t-lg bg-zinc-400 text-white font-extrabold'>
                    <div className='flex flex-row'>
                        <div className='p-2 basis-5/12 overflow-hidden text-ellipsis'>
                            Value
                        </div>
                        <div className='p-2 basis-1/4 overflow-hidden text-ellipsis'>
                            Type
                        </div>
                        <div className='p-2 basis-1/4 overflow-hidden text-ellipsis'>
                            Method
                        </div>
                    </div>
                </div>
                <div className='h-48 bg-white border-2 border-zinc-400 rounded-b-lg p-4 overflow-y-scroll space-y-2'>
                    {filters.map(filter => (
                        <Filter key={filter.id} filter={filter} />
                    ))}
                </div>
            </div>
        </div>

    )
}

function Filter({ filter }) {
    const dispatch = useFiltersDispatch();
    return (
        <div className={`${filter.positive === 1 ? 'border-green-400' : 'border-red-400'} border-2 bg-zinc-100 rounded-lg`}>
            <div className='flex flex-row'>
                <div className='p-2 basis-5/12 overflow-hidden text-ellipsis'>
                    {filter.value}
                </div>
                <div className='p-2 basis-1/4 overflow-hidden text-ellipsis'>
                    {filter.type}
                </div>
                <div className='p-2 basis-1/4 overflow-hidden text-ellipsis'>
                    {filter.method}
                </div>
                <div className='p-2 basis-1/12 text-center'>
                    <ActionButton
                        actionType='delete'
                        action={() => {
                            dispatch({
                                op: 'delete',
                                id: filter.id
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

function SearchParameters() {
    const { activeState: [activeUse, setActiveUse], depthValue: [depth, setDepth], apiKeyVal: [apiKeyValue, setApiKeyValue], apiValidation: [apiKeyState, setApiKeyState] } = useSearchParameters();
    const apiKeyLength = 39;

    const handleActiveClick = () => {
        setActiveUse(!activeUse);
    };

    const handleRangeChange = (event) => {
        setDepth(event.target.value);
    };

    return (
        <div className='w-full space-y-4'>
            <div className='space-y-2'>
                <div className='flex flex-row items-center gap-2'>
                    <Hint>Here you must enter Google API key to use Google Search API.</Hint>
                    <div className='flex-initial font-medium truncate text-zinc-900'>API key</div>
                    <div className='flex-1'>
                        <input
                            type="text"
                            name="apiKey"
                            id="apiKey"
                            size={apiKeyLength}
                            className='w-full rounded-md p-2 text-zinc-900 border-2 border-zinc-400 placeholder:text-zinc-400'
                            placeholder="API key"
                            onChange={e => {
                                setApiKeyValue(e.target.value)
                                setApiKeyState("pending")
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="h-10">
                    <div className={`${apiKeyState === "invalid" ? '' : 'hidden'} p-2 text-sm text-yellow-600 border border-2 border-yellow-600 rounded-md bg-yellow-50`}>
                        The API key is not valid.  Please check your API key.
                    </div>
                    <div className={`${apiKeyState === "error" ? '' : 'hidden'} p-2 text-sm text-yellow-600 border border-2 border-yellow-600 rounded-md bg-yellow-50`}>
                        We are not able to perform the query. Please check your API key.
                    </div>
                </div>

            </div>


            <div className='flex items-center gap-2'>
                <Hint>This option activates the active search, specific queries are likely to be made to websites that cannot be trusted. Use with caution.</Hint>
                <div className="flex-initial font-medium truncate">Active search</div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" id="activeSearch" name="activeSearch" defaultChecked={activeUse} onChange={handleActiveClick} />
                    <div class="w-[36px] h-5 bg-zinc-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>This option defines the maximum number of recursions that can be performed on the target during the search.</Hint>
                <div className="flex-initial font-medium truncate">Search depth</div>
                <div className="flex-initial font-medium">
                    <div className="w-9 bg-zinc-400 rounded-md text-center">
                        {depth}
                    </div>
                </div>
                <div className="flex-initial">
                    <input id="depth" name="depth" type="range" min="1" max="6" value={depth} className="h-4 w-full focus:ring-2 focus:ring-inset rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600" onChange={handleRangeChange} />
                </div>
            </div>
        </div >
    )
}

function Hint({ children }) {
    return (
        <div className='group relative'>
            <div className='w-5 h-5 border-2 border-solid border-zinc-900 bg-zinc-300 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:ring-2 hover:ring-inset hover:ring-zinc-400'>
                <div className='mt-[3px]'>
                    <div className='ml-[7px] w-0.5 h-0.5 bg-zinc-900 rounded mb-px' ></div>
                    <div className='ml-[7px] w-0.5 h-[7px] bg-zinc-900 rounded' ></div>
                </div>
            </div>
            <div className='absolute left-7 bottom-0 top-[-10px] hidden opacity-0 transition-opacity group-hover:block group-hover:opacity-100 z-10 md:max-w-xl sm:max-w-md max-w-xs w-max'>
                <div className='bg-white p-2 text-sm rounded-lg border-2 border-solid border-zinc-300'>
                    {children}
                </div>
            </div>
        </div>
    );
}

function ActionButton({ actionType, action }) {
    function genButton() {
        switch (actionType) {
            case 'add': {
                return (
                    <div className='flex items-center' onClick={action}>
                        <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-sky-900 bg-sky-300 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:ring-2 hover:ring-inset hover:ring-sky-400'>
                            <div className='absolute w-3 h-0.5 bg-sky-900 rounded' ></div>
                            <div className='absolute w-0.5 h-3 bg-sky-900 rounded' ></div>
                        </div>
                    </div>
                )
            }
            case 'edit': {
                return (
                    <div className='flex items-center' onClick={action}>
                        <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-yellow-900 bg-yellow-300 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:ring-2 hover:ring-inset hover:ring-yellow-400'>
                            <div className='rotate-45'>
                                <div className='w-[3px] h-2.5 bg-yellow-900 mb-px rounded-t' ></div>
                                <div className='w-[3px] h-[3px] bg-yellow-900 rounded-b' ></div>
                            </div>
                        </div>
                    </div>
                )
            }
            case 'delete': {
                return (
                    <div className='flex items-center' onClick={action}>
                        <div className='relative flex items-center justify-center w-6 h-6 border-2 border-solid border-red-900 bg-red-300 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:ring-1 hover:ring-inset hover:ring-red-400'>
                            <div className='absolute w-2.5 h-0.5 bg-red-900 rounded' ></div>
                        </div>
                    </div>
                )
            }
            default: {
                return (<></>)
            }
        }
    }
    return (
        genButton()
    )
}

function SearchButton() {
    const [searchInProgress, setSearchInProgress] = useState(false);
    const { targetValue: [targetValue,], targetState: [, setTargetValid] } = useTarget();
    const filtersData = useFilters();
    const [clickOnSubmit, setClickOnSubmit] = useState(false) //enable the useEffect to still run even if the apiKey does not change
    const { activeState: [activeUse,], depthValue: [depth,], apiKeyVal: [apiKeyValue, setApiKeyValue], apiValidation: [apiKeyState, setApiKeyState] } = useSearchParameters();
    const dispatch = useFingerprintsDispatch();
    const apiKeyLength = 39;

    function handleSubmit() {

        if (targetValue?.toString() !== undefined && targetValue?.toString() !== '') {
            setTargetValid(true)
        } else {
            setTargetValid(false)
        }

        if (apiKeyValue?.length === apiKeyLength) {
            if (apiKeyValue === '000000000000000000000000000000000000000') { // Specific value to avoid API use
                setApiKeyValue(apiKeyValue);
                setApiKeyState('valid');
                setClickOnSubmit(!clickOnSubmit);
            } else {
                const params = {
                    q: 'test',
                    key: apiKeyValue,
                    cx: '566c87e9879ac4d59',
                };

                const config = {
                    headers: {
                        Accept: 'application/json',
                    },
                };

                axios
                    .get('https://customsearch.googleapis.com/customsearch/v1', { params, ...config })
                    .then(function () {
                        setApiKeyValue(apiKeyValue);
                        setApiKeyState('valid');
                        setClickOnSubmit(!clickOnSubmit);
                    })
                    .catch(error => {
                        console.error(error);
                        setApiKeyState('error');
                        setClickOnSubmit(!clickOnSubmit);
                    });
            }
        }
        else {
            setApiKeyState('invalid');
            setClickOnSubmit(!clickOnSubmit);
        }

        
    };

    useEffect(() => {
        if (searchInProgress === false && apiKeyState === 'valid') {

            const params = {
                target: targetValue?.toString(),
                active_search: activeUse === true ? 1 : 0,
                depth: depth,
                initial_filters: JSON.stringify(
                    filtersData.map(filter => {
                        return {
                            value: filter.value,
                            type: filter.type,
                            positive: filter.positive
                        };
                    })
                )
            }

            if (apiKeyValue !== '') {
                params['api_key'] = apiKeyValue;
            } else {
                return; // Workaround to force to provide API key if API is selected
            }

            setSearchInProgress(true)
            axios
                .get('http://127.0.0.1:5000/api/?', { params })
                .then(response => {
                    dispatch({
                        op: 'new',
                        fingerprint: response.data
                    })
                    setSearchInProgress(false); // Process ends
                    const elem = document.getElementById("results");
                    if (elem) {
                        elem.scrollIntoView({ behavior: 'smooth' });
                    }
                })
                .catch(error => {
                    console.error(error);
                    setSearchInProgress(false); // Process ends
                });
        }
    }, [clickOnSubmit, apiKeyState]);

    return (
        <div className='flex-wrap relative'>
            <div className='basis-full'>
                <button className='rounded-lg p-4 text-white border-2 bg-zinc-500 border-zinc-400 hover:bg-zinc-400' onClick={handleSubmit}>Launch search</button>
            </div>
            <div className={`${searchInProgress ? 'visible' : 'invisible'} basis-full flex justify-center items-center`}>
                <svg className='animate-spin h-5 w-5 mr-3' viewBox="0 0 24 24">
                    <circle cx='12' cy='12' r='10' stroke='currentColor' fillOpacity='0' strokeOpacity='0.25' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Search in progress...
            </div>
        </div>
    )
}
