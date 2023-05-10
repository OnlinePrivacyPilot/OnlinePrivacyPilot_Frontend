import React, { useState } from 'react';

function UserInput() {
    return (
        <div className='bg-zinc-100 min-h-screen py-16 px-4'>
            <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 flex flex-wrap'>
                <div className='inline space-y-8 bg-zinc-300 p-4 basis-full lg:basis-3/4 max-w-full'>
                    <FilterInput />
                    <SearchParameters />
                    <FiltersViewer />
                </div>
                <div className='bg-zinc-300 p-4 lg:pt-64 basis-full lg:basis-1/4 text-center'>
                    <SearchButton />
                </div>
            </div>
        </div>
    );
}

function Hint({children}) {
    return (
        <div className='group relative'>
            <div className='border-2 border-solid border-zinc-800 h-7 leading-6 w-7 rounded-full text-center font-sm text-zinc-800'>
                i
            </div>
            <div className='absolute left-9 bottom-0 top-0 opacity-0 transition-opacity group-hover:opacity-100 z-10 md:max-w-xl max-w-sm w-max'>
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

function FilterInput() {
    return (
        <div className='w-full space-y-8'>
            <div className='space-y-2'>
                <div className='flex-initial flex items-center gap-2'>
                    <Hint>This is a hint.</Hint>
                    <div className="font-medium truncate text-gray-900">
                        Main filter
                    </div>
                </div>
                <MainFilterInput />
            </div>
            <div className='space-y-2'>
                <div className='flex-initial flex items-center gap-2'>
                    <Hint>This is a hint.</Hint>
                    <div className="font-medium truncate text-gray-900">
                        Other filter(s)
                    </div>
                </div>
                <OtherFilter isSubmitted={true} />
                <OtherFilter isSubmitted={false} />
            </div>
        </div>

    )
}


function MainFilterInput() {
    return (
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
                    <option>Name</option>
                    <option>Username</option>
                    <option>Email</option>
                </select>
            </div>
        </div>
    )
}

function OtherFilter(props) {
    return (
        <div className='flex gap-4'>
            <OtherFilterInput isSubmitted={props.isSubmitted} />
            <OtherFilterButton isSubmitted={props.isSubmitted} />
        </div>
    );
}

function OtherFilterInput(status) {
    return (
        <div className="flex-1 relative rounded-md shadow-sm">
            <input
            type="text"
            name="otherFilterValue"
            id="otherFilterValue"
            className="block w-full rounded-md py-2 pl-4 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
            placeholder="John Doe"
            disabled={status.isSubmitted}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                <select
                    id="otherFilterPositive"
                    name="otherFilterPositive"
                    className="h-full rounded-l-md text-sm border-2 border-r-1 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    disabled={status.isSubmitted}
                >
                    <option>Positive</option>
                    <option>Negative</option>
                </select>
                <select
                    id="otherFilterType"
                    name="otherFilterType"
                    className="h-full rounded-r-md text-sm border-2 border-l-0 border-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    disabled={status.isSubmitted}
                >
                    <option>Name</option>
                    <option>Username</option>
                    <option>Email</option>
                    <option>Location</option>
                    <option>Phone</option>
                    <option>Occupation</option>
                </select>
            </div>
        </div>
    )
}

function OtherFilterButton(status) {
    if (status.isSubmitted) {
        return (
            <div className='flex items-center'>
                <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-red-800 bg-red-200 rounded-full'>
                    <div className='absolute w-3 h-0.5 bg-red-800' ></div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='flex items-center'>
                <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-green-800 bg-green-200 rounded-full'>
                    <div className='absolute w-3 h-0.5 bg-green-800' ></div>
                    <div className='absolute w-0.5 h-3 bg-green-800' ></div>
                </div>
            </div>
        )
    }
}

function FiltersViewer() {
    const [filtersView, setFiltersView] = useState(false);

    const toggleFiltersView = () => {
        setFiltersView(!filtersView);
    };
    return (
        <div>
            <div className='w-full p-4 flex items-center justify-center'>
                <button className={`md:basis-1/2 basis-full rounded-lg px-8 py-2`} onClick={toggleFiltersView}> {filtersView === true ? '↑ Hide' : '↓ Show'} all filters</button>
            </div>
            <div className={`${filtersView === true ? 'block' : 'hidden'} h-48 bg-zinc-400 border-2 rounded-lg p-4 overflow-y-scroll overflow-x-scroll`}>
                <table className="table-fixed border-collapse border-spacing-2">
                    <thead className='bg-zinc-500 text-white'>
                        <tr>
                        <th>Value</th>
                        <th>Type</th>
                        <th>Method</th>
                        <th style={{width:80}}>Positive</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Paris</td>
                        <td>location</td>
                        <td>user_input</td>
                        <td className='text-center'>✅</td>
                        </tr>
                        <tr>
                        <td>Engineer</td>
                        <td>occupation</td>
                        <td>user_input</td>
                        <td className='text-center'>✅</td>
                        </tr>
                        <tr>
                        <td>Paul</td>
                        <td>name</td>
                        <td>user_input</td>
                        <td className='text-center'>❎</td>
                        </tr>
                        <tr>
                        <td>Jack454</td>
                        <td>username</td>
                        <td>user_input</td>
                        <td className='text-center'>❎</td>
                        </tr>
                        <tr>
                        <td>https://example.com/#thisIsALongURLToShowTruncateMethod</td>
                        <td>url</td>
                        <td>user_input</td>
                        <td className='text-center'>❎</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SearchParameters() {
    const [showAPIOptions, setShowAPIOptions] = useState(false);
    const [depthValue, setDepthValue] = useState(2);
    const [apiKeyValue, setApiKey] = useState("");
    const [cseIdValue, setCseId] = useState("");
    const [apiKeyState, setApiKeyState] = useState(false);
    const [cseIdState, setCseIdState] = useState(false);

    const apiKey = document.getElementById('apiKey');
    const cseId = document.getElementById('cseId');
    
    const apiKeyLength = 39;
    const cseIdLength = 17;

    const handleAPIClick = (event) => {
        setShowAPIOptions(!showAPIOptions);
        enableInputs();
    };

    const handleRangeChange = (event) => {
        setDepthValue(event.target.value);
    };
    
    const disableInputs = (event) => {
        if (apiKeyValue.length === apiKeyLength && cseIdValue.length === cseIdLength){
            setApiKeyState(true);
            setCseIdState(true);
        }
        apiKey.value = apiKeyValue;
        cseId.value = cseIdValue;
    };

    const enableInputs = (event) => {
        setApiKeyState(false);
        setCseIdState(false);
    };

    return (
        <div className='w-full h-15 bg-zinc-400 space-y-4 p-2'>
            <div className=''>
                <div className='flex-initial flex items-center gap-2 h-10'>
                    <div className="items-center align-middle inline-flex flex-shrink-0 w-28 gap-2">
                        <input type="checkbox" id="checkbox" name="apiKey" value="unchecked" onClick={handleAPIClick}/>
                        <span className='font-medium truncate text-gray-900'>API</span>
                        <Hint>This is a hint.</Hint>
                    </div>
                    
                    <form className='inline-flex gap-2'>
                       <input
                        type="text"
                        name="apiKey"
                        disabled= {apiKeyState}
                        id="apiKey"
                        size={apiKeyLength}
                        className={`${showAPIOptions === false ? 'hidden' : ''} block w-full rounded-md py-2 pl-2 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400`}
                        placeholder="API key"
                        pattern="[a-zA-Z0-9]{17}"
                        onChange={(e) => {setApiKey(e.target.value)}}
                        required
                        />

                        <input
                            type="text"
                            name="cseId"
                            id="cseId"
                            disabled= {cseIdState}
                            className={`${showAPIOptions === false ? 'hidden' : ''} block rounded-md py-2 pl-2 pr-20 border-zinc-400 placeholder:text-zinc-400 border-2 w-full  text-gray-900`}
                            placeholder="CSE id"
                            pattern="[a-zA-Z0-9]{17}"
                            size={cseIdLength}
                            onChange={(e) => {setCseId(e.target.value)}}
                            required 
                            />
                                               
                    </form>
                    
                    <div className='hfull align-middle'>
                        <button className={`${showAPIOptions === false ? 'hidden' : ''} w-20 rounded-md text-sm ring-2 ring-inset ring-indigo-400 bg-zinc-300 py-2 px-4 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500`} onClick={apiKeyState === false? disableInputs : enableInputs}>
                            {apiKeyState === false? 'Add' : 'Modify'}
                        </button>
                    </div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='flex-initial flex items-center gap-2'>
                    <div className="font-medium truncate text-gray-900">
                        <input type="checkbox" id="apiKey" name="apiKey" value="unchecked" />
                        <span class="ml-1">Active search</span>
                    </div>
                    <Hint>This is a hint.</Hint>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='flex-initial flex items-center gap-2'>
                    <div className="items-center align-middle inline-flex flex-shrink-0 w-28 gap-2">
                        <div className="font-medium truncate text-gray-900">
                            Depth
                        </div>
                        <Hint>This is a hint.</Hint>
                    </div>
                    <div class="flex w-50 items-center font-sans gap-2">
                        <input id="depth" name="depth" type="range" min="1" max="6" value={depthValue} class="h-4 w-full focus:ring-2 focus:ring-inset rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={handleRangeChange}/>
                        <label for="depth">{depthValue}</label>
                    </div>
                </div>
                
            </div>
        </div>
    )
}


export default UserInput;
