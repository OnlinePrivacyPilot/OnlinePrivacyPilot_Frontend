import { useState, useContext } from 'react';
import { FiltersProvider, useFilters, useFiltersDispatch } from '../contexts/FiltersContext'
import { SearchParametersProvider, useSearchParameters, SearchParametersContext } from '../contexts/SearchParametersContext';

export default function SearchForm() {
    return (
        <div className='bg-zinc-100 min-h-screen py-16 px-4'>
            <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 flex flex-wrap'>
                <div className='inline space-y-8 bg-zinc-300 p-4 basis-full lg:basis-3/4 max-w-full'>
                    <AddTarget />
                    <FiltersProvider>
                        <AddFilter />
                        <FiltersList />
                        <SearchParametersProvider>
                            <SearchParameters />
                        </SearchParametersProvider>
                    </FiltersProvider>
                </div>
                <div className='bg-zinc-300 p-4 lg:pt-64 basis-full lg:basis-1/4 text-center'>
                    <SearchButton />
                </div>
            </div>
        </div>
    )
}

function AddFilter() {
    const [value, setValue] = useState('');
    const [type, setType] = useState('name');
    const [positive, setPositive] = useState('true');
    const dispatch = useFiltersDispatch();
    const nextId = useFilters().length;
    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>This is a hint.</Hint>
                <div className="font-medium truncate text-gray-900">
                    Other filter(s)
                </div>
            </div>
            <div className='flex gap-4'>
                <div className="flex-1 relative rounded-md shadow-sm">
                    <input
                        className="block w-full rounded-md py-2 pl-4 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                        placeholder="John Doe"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <select
                            id="otherFilterPositive"
                            name="otherFilterPositive"
                            className="h-full rounded-l-md text-sm border-2 border-r-1 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            value={positive}
                            onChange={e => setPositive(e.target.value)}
                        >
                            <option value="true" selected="selected">Positive</option>
                            <option value="false">Negative</option>
                        </select>
                        <select
                            id="otherFilterType"
                            name="otherFilterType"
                            className="h-full rounded-r-md text-sm border-2 border-l-0 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            <option value="name" selected="selected">Name</option>
                            <option value="username">Username</option>
                            <option value="email">Email</option>
                            <option value="location">Location</option>
                            <option value="phone">Phone</option>
                            <option value="occupation">Occupation</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div 
                        className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-green-800 bg-green-200 rounded-full'
                        onClick={() => {
                            setValue('');
                            console.log(type);
                            dispatch({
                                op: 'added',
                                id: nextId,
                                value: value,
                                type: type,
                                positive: positive
                            });
                        }}
                    >
                        <div className='absolute w-3 h-0.5 bg-green-800' ></div>
                        <div className='absolute w-0.5 h-3 bg-green-800' ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function AddTarget() {
    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>This is a hint.</Hint>
                <div className="font-medium truncate text-gray-900">
                    Main filter
                </div>
            </div>
            <div className="relative rounded-lg shadow-sm">
                <input
                type="text"
                name="mainFilterValue"
                id="mainFilterValue"
                className="block w-full text-xl rounded-lg py-4 pl-4 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                placeholder="John Doe"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                        id="mainFilterType"
                        name="mainFilterType"
                        className="h-full rounded-lg text-base border-2 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        <option selected="selected">Name</option>
                        <option>Username</option>
                        <option>Email</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

function FiltersList() {
    const filters = useFilters();
    return (
        <div className='h-48 bg-zinc-400 border-2 rounded-lg p-4 overflow-y-scroll overflow-x-scroll'>
            {filters.map(filter => (
                <Filter filter={filter} />
            ))}
        </div>
    )
}

function Filter({filter}) {
    return (
        <div>
            {filter.id} {filter.value} {filter.type} {filter.method} {filter.positive}
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
        <div className='w-full h-15 bg-zinc-400 space-y-4 p-2'>
            <div className='max-w-full'>
                <div className='flex-initial flex items-center gap-2 h-10'>
                    <div className="items-center align-middle inline-flex flex-shrink-0 w-28 gap-2">
                        <Hint>This is a hint.</Hint>
                        <input type="checkbox" id="checkbox" name="apiKey" checked={apiUse} onClick={handleAPIClick}/>
                        <span className='font-medium truncate text-gray-900'>API</span>
                    </div>
                    
                    <form className='inline-flex gap-2'>
                       <input
                        type="text"
                        name="apiKey"
                        disabled= {apiKeyState}
                        id="apiKey"
                        size={apiKeyLength}
                        className={`${apiUse === false ? 'hidden' : ''} block w-full rounded-md py-2 pl-2 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400`}
                        placeholder="API key"
                        pattern="[a-zA-Z0-9]{17}"
                        onChange={handleApiValue}
                        required
                        />

                        <input
                            type="text"
                            name="cseId"
                            id="cseId"
                            disabled= {cseIdState}
                            className={`${apiUse === false ? 'hidden' : ''} block rounded-md py-2 pl-2 pr-20 border-zinc-400 placeholder:text-zinc-400 border-2 w-full  text-gray-900`}
                            placeholder="CSE Id"
                            pattern="[a-zA-Z0-9]{17}"
                            size={cseIdLength}
                            onChange={handleCseValue}
                            required 
                        />
                                               
                    </form>
                    
                    <div className='hfull align-middle'>
                        <button className={`${apiUse === false ? 'hidden' : ''} w-20 rounded-md text-sm ring-2 ring-inset ring-indigo-400 bg-zinc-300 py-2 px-4 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500`} onClick={apiKeyState === false? disableInputs : enableInputs}>
                            {apiKeyState === false? 'Add' : 'Modify'}
                        </button>
                    </div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='flex-initial flex items-center gap-2'>
                    <Hint>This is a hint.</Hint>
                    <div className="font-medium truncate text-gray-900">
                        <input type="checkbox" id="apiKey" name="apiKey" checked={activeUse} onClick={handleActiveClick} />
                        <span class="ml-1">Active search</span>
                    </div>
                    
                </div>
            </div>
            <div className='space-y-2'>
                <div className='flex-initial flex items-center gap-2'>
                    <div className="items-center align-middle inline-flex flex-shrink-0 w-28 gap-2">
                        <Hint>This is a hint.</Hint>
                        <div className="font-medium truncate text-gray-900">
                            Depth
                        </div>   
                    </div>
                    <div class="flex w-50 items-center font-sans gap-2">
                        <input id="depth" name="depth" type="range" min="1" max="6" value={depth} class="h-4 w-full focus:ring-2 focus:ring-inset rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={handleRangeChange}/>
                        <label for="depth">{depth}</label>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

function Hint({children}) {
    return (
        <div className='group relative'>
            <div className='border-2 border-solid border-zinc-800 h-7 leading-6 w-7 rounded-full text-center font-sm text-zinc-800'>
                i
            </div>
            <div className='absolute left-9 bottom-0 top-0 hidden opacity-0 transition-opacity group-hover:block group-hover:opacity-100 z-10 md:max-w-xl max-w-sm w-max'>
                <div className='bg-white p-1 text-sm rounded-lg border-2 border-solid border-zinc-300'>
                    {children}
                </div>
            </div>
        </div>
    );
}

function SearchButton() {
    return (
        <button className='rounded-lg p-4'>Launch search</button>
    )
}
