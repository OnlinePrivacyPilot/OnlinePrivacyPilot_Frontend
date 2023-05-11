import { useState } from 'react';
import { TargetProvider, useTarget } from '../contexts/TargetContext'
import { FiltersProvider, useFilters, useFiltersDispatch } from '../contexts/FiltersContext'
import { SearchParametersProvider, useSearchParameters } from '../contexts/SearchParametersContext';

export default function SearchForm() {
    return (
        <div className='bg-zinc-100 min-h-screen py-16 px-4'>
            <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 flex flex-wrap'>
                <div className='inline space-y-8 bg-zinc-300 p-4 basis-full lg:basis-3/4 max-w-full'>
                    <TargetProvider>
                        <AddTarget />
                    </TargetProvider>
                    <FiltersProvider>
                        <AddFilter />
                        <FiltersList />
                    </FiltersProvider>
                    <SearchParametersProvider>
                        <SearchParameters />
                    </SearchParametersProvider>
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
                    <ActionButton
                        style='add'
                        action={() => {
                            setValue('');
                            dispatch({
                                op: 'added',
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
    const { targetValue: [targetValue, setTargetValue], targetType: [targetType, setTargetType] } = useTarget();

    return (
        <div className='space-y-2'>
            <div className='flex-initial flex items-center gap-2'>
                <Hint>This is a hint.</Hint>
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
                    value={targetValue}
                    onChange={e => {
                        setTargetValue(e.target.value)
                    }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                        id="mainFilterType"
                        name="mainFilterType"
                        className="h-full rounded-lg text-base border-2 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        value={targetType}
                        onChange={e => {
                            setTargetType(e.target.value)
                        }}
                    >
                        <option value="name" selected="selected">Name</option>
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
                <Hint>This is a hint.</Hint>
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
                        <Filter filter={filter} />
                    ))}
                </div>
            </div>
        </div>

    )
}

function Filter({filter}) {
    const dispatch = useFiltersDispatch();
    return (
        <div className={`${filter.positive === 'true' ? 'border-green-400' : 'border-red-400'} border-2 bg-zinc-100 rounded-lg`}>
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
                                op: 'deleted',
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
        <div className='w-full h-15 bg-zinc-400 space-y-4 p-2'>
            <div className='flex items-center gap-4 h-10'>
                <div className="items-center align-middle inline-flex gap-2">
                    <Hint>This is a hint.</Hint>
                    <input type="checkbox" id="checkbox" name="apiKey" checked={apiUse} onClick={handleAPIClick}/>
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
                        className='block rounded-md p-2 border-zinc-400 placeholder:text-zinc-400 border-2 w-full text-gray-900'
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
            <div className='space-y-2 sm:w-1/3'>
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

function ActionButton({style, action}) {
    function genButton() {
        switch (style) {
            case 'add': {
                return (
                    <div className='flex items-center' onClick={action}>
                        <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-green-900 bg-green-300 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:ring-2 hover:ring-inset hover:ring-green-400'>
                            <div className='absolute w-3 h-0.5 bg-green-900' ></div>
                            <div className='absolute w-0.5 h-3 bg-green-900' ></div>
                        </div>
                    </div>
                )
            }
            case 'edit': {
                return (
                    <div className='flex items-center' onClick={action}>
                        <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-yellow-900 bg-yellow-300 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:ring-2 hover:ring-inset hover:ring-yellow-400'>
                            <div className='rotate-45'>
                                <div className='w-[3px] h-3 bg-yellow-900 mb-px' ></div>
                                <div className='w-[3px] h-[3px] bg-yellow-900 rounded-b-full' ></div>
                            </div>
                        </div>
                    </div>
                )
            }
            case 'delete': {
                return (
                    <div className='flex items-center' onClick={action}>
                        <div className='relative flex items-center justify-center w-6 h-6 border-2 border-solid border-red-900 bg-red-300 rounded-full opacity-70 transition-opacity hover:opacity-100 hover:ring-1 hover:ring-inset hover:ring-red-400'>
                            <div className='absolute w-2 h-0.5 bg-red-900' ></div>
                        </div>
                    </div>
                )
            }
        }
    }
    return (
        genButton()
    )
}

function SearchButton() {
    return (
        <button className='rounded-lg p-4'>Launch search</button>
    )
}
