import { useState } from 'react';
import { TargetProvider, useTarget } from '../contexts/TargetContext'
import { FiltersProvider, useFilters, useFiltersDispatch } from '../contexts/FiltersContext'
import { SearchParametersProvider, useSearchParameters } from '../contexts/SearchParametersContext';
import { useFingerprintsDispatch } from '../contexts/FingerprintsContext';
import axios from 'axios'

export default function SearchForm() {
    return (
    <TargetProvider>
        <FiltersProvider>
            <SearchParametersProvider>
                <div className='min-h-screen py-16 px-4'>
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
        </FiltersProvider>
    </TargetProvider>
    )
}

function AddFilter() {
    const [value, setValue] = useState('');
    const [type, setType] = useState('name');
    const [positive, setPositive] = useState(1);
    const dispatch = useFiltersDispatch();
    const nextId = useFilters().length;
    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>Here you can specify filters to improve the relevance of the search, positive filters are used to select a subset of results and negative filters are used to exclude a subset of results.</Hint>
                <div className="font-medium truncate text-gray-900">
                    Add filter
                </div>
            </div>
            <div className='flex gap-4'>
                <div className="flex-1 relative rounded-md shadow-sm">
                    <input
                        className="block w-full rounded-md py-2 pl-4 pr-52 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                        placeholder="John Doe"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <select
                            id="otherFilterPositive"
                            name="otherFilterPositive"
                            className="h-full rounded-l-md text-sm border-2 border-r-1 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            defaultValue={1}
                            onChange={e => setPositive(+e.target.value)}
                        >
                            <option value={1}>Positive</option>
                            <option value={0}>Negative</option>
                        </select>
                        <select
                            id="otherFilterType"
                            name="otherFilterType"
                            className="h-full rounded-r-md text-sm border-2 border-l-0 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            defaultValue="name"
                            onChange={e => setType(e.target.value)}
                        >
                            <option value="name">Name</option>
                            <option value="username">Username</option>
                            <option value="email">Email</option>
                            <option value="location">Location</option>
                            <option value="phone">Phone</option>
                            <option value="occupation">Occupation</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center'>
                    <ActionButton
                        style='add'
                        action={() => {
                            setValue('');
                            dispatch({
                                op: 'add',
                                id: nextId,
                                value: value,
                                type: type,
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
    const { targetValue: [targetValue, setTargetValue], targetType: [, setTargetType] } = useTarget();

    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>Here you have to specify the target, i.e. a piece of information that characterizes you and that will be used as a starting point for the search.</Hint>
                <div className="font-medium truncate text-gray-900">
                    Target
                </div>
            </div>
            <div className="relative rounded-lg shadow-sm">
                <input
                    type="text"
                    name="mainFilterValue"
                    id="mainFilterValue"
                    className="block w-full text-xl rounded-lg py-4 pl-4 pr-32 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                    placeholder="John Doe"
                    onChange={e => {
                        setTargetValue(e.target.value)
                    }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                        id="mainFilterType"
                        name="mainFilterType"
                        className="h-full rounded-lg text-base border-2 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        defaultValue="name"
                        onChange={e => {
                            setTargetType(e.target.value)
                        }}
                    >
                        <option value="name">Name</option>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                    </select>
                </div>
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
                <div className="font-medium truncate text-gray-900">
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

function Filter({filter}) {
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
                        style='delete'
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
    const { apiState: [apiUse, setApiUse], activeState: [activeUse, setActiveUse], depthValue: [depth, setDepth], apiKeyState: [ ,setApiKeyValue], cseIdState: [ ,setCseIdValue] } = useSearchParameters();
    const [apiKeyState, setApiKeyState] = useState(false);
    const [cseIdState, setCseIdState] = useState(false);

    const apiKeyLength = 39;
    const cseIdLength = 17;

    const handleAPIClick = () => {
        setApiUse(!apiUse);
        enableInputs();
    };

    const handleActiveClick = () => {
        setActiveUse(!activeUse);
    };

    const handleRangeChange = (event) => {
        setDepth(event.target.value);
    };

    const handleApiValue = (e) => {
        const apiKey = document.getElementById('apiKey');
        apiKey.value = e.target.value;
    };

    const handleCseValue = (e) => {
        const cseId = document.getElementById('cseId');
        cseId.value = e.target.value;
    };
    
    const disableInputs = () => {
        const apiKey = document.getElementById('apiKey');
        const cseId = document.getElementById('cseId');
        if (apiKey.value.length === apiKeyLength && cseId.value.length === cseIdLength){
            setApiKeyState(true);
            setCseIdState(true);
            setCseIdValue(cseId.value)
            setApiKeyValue(apiKey.value)
        }
    };

    const enableInputs = () => {
        setApiKeyState(false);
        setCseIdState(false);
        setCseIdValue('');
        setApiKeyValue('');
    };

    return (
        <div className='w-full space-y-4'>
            <div className='flex items-center gap-4 max-h-6'>
                <div className="flex-initial flex items-center gap-2">
                    <Hint>Here you can enter Google API key and CSE ID to use Google Search API instead of scraping results from Google webpage. If you don't want to use Google Search API, clear the checkbox.</Hint>
                    <input type="checkbox" id="checkbox" name="apiKey" defaultChecked={apiUse} onChange={handleAPIClick}/>
                    <span className='font-medium truncate text-gray-900'>API</span>
                </div>
                <div className={`${apiUse === false ? 'hidden' : ''} flex gap-2`}>
                    <input
                    type="text"
                    name="apiKey"
                    disabled= {apiKeyState}
                    id="apiKey"
                    size={apiKeyLength}
                    className='block w-full rounded-md p-2 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400'
                    placeholder="API key"
                    onChange={handleApiValue}
                    required
                    />

                    <input
                        type="text"
                        name="cseId"
                        id="cseId"
                        disabled= {cseIdState}
                        className='block w-full rounded-md p-2 border-zinc-400 placeholder:text-zinc-400 border-2 text-gray-900'
                        placeholder="CSE Id"
                        size={cseIdLength}
                        onChange={handleCseValue}
                        required 
                    />
                    <ActionButton
                        style={apiKeyState === false? 'add' : 'edit'}
                        action={apiKeyState === false? disableInputs : enableInputs}
                    />
                </div>
            </div>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>This option activates the active search, specific queries are likely to be made to websites that cannot be trusted. Use with caution.</Hint>
                <div className="font-medium truncate text-gray-900">
                    <input type="checkbox" id="apiKey" name="apiKey" defaultChecked={activeUse} onChange={handleActiveClick} />
                    <span className="ml-1">Active search</span>
                </div>
                
            </div>
            <div className='flex-initial flex items-center gap-2'>
                <div className="items-center align-middle inline-flex flex-shrink-0 w-28 gap-2">
                    <Hint>This option defines the maximum number of recursions that can be performed on the target during the search.</Hint>
                    <div className="font-medium truncate text-gray-900">
                        Depth
                    </div>   
                </div>
                <div className="flex w-50 items-center font-sans gap-2">
                    <input id="depth" name="depth" type="range" min="1" max="6" value={depth} className="h-4 w-full focus:ring-2 focus:ring-inset rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={handleRangeChange}/>
                    <label htmlFor="depth">{depth}</label>
                </div>
            </div>
        </div>
    )
}

function Hint({children}) {
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

function ActionButton({style, action}) {
    function genButton() {
        switch (style) {
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
                // return nothing
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
    const targetData = useTarget();
    const filtersData = useFilters();
    const searchParametersData = useSearchParameters();
    const dispatch = useFingerprintsDispatch();
    
    function handleSubmit() {
        if (searchInProgress === false && targetData.targetValue[0] !== '') {

            if (searchParametersData.apiState[0]) {
                if (searchParametersData.apiKeyState[0] !== '' && searchParametersData.cseIdState[0] !== '') {
                    params['api_key'] = searchParametersData.apiKeyState[0];
                    params['cse_id'] = searchParametersData.cseIdState[0]; 
                } else {
                    return; // Workaround to force to provide API key if API is selected
                }
            }
                 
            const params = {
                target: targetData.targetValue[0].toString(),
                active_search: searchParametersData.activeState[0] === true ? 1 : 0,
                depth: searchParametersData.depthValue[0],
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

            setSearchInProgress(true); // Process starts

            axios
                .get('http://127.0.0.1:5000/api/?', { params })
                .then(response => {
                    console.log(response.data);
                    dispatch({
                        op: 'new',
                        fingerprint: response.data
                    })
                    setSearchInProgress(false); // Process ends
                })
                .catch(error => {
                    console.error(error);
                    setSearchInProgress(false); // Process ends
                });
        }
    };
          
    return (
        <div className='flex-wrap space-y-4'>
            <div className='basis-full'>
                <button className='rounded-lg p-4' onClick={handleSubmit}>Launch search</button>
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
