import React, { useState } from 'react';

function UserInput() {
    return (
        <div className='bg-zinc-100 min-h-screen py-16 px-4'>
            <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 flex flex-wrap'>
                <div className='inline space-y-8 bg-zinc-300 p-4 basis-full lg:basis-3/4 max-w-full'>
                    <FilterInput />
                    <FiltersViewer />
                    <SearchParameters />
                </div>
                <div className='bg-zinc-300 p-4 basis-full lg:basis-1/4  max-w-full flex items-center justify-center'>
                <SearchButton />
                </div>
            </div>
        </div>
    );
}

function Hint({hintMessage}) {
    return (
        <div className='group relative'>
            <div className='border-2 border-solid border-zinc-800 h-5 leading-4 w-5 rounded-full text-center font-sm text-zinc-800'>
                i
            </div>
            <div class="pointer-events-none absolute opacity-0 transition-opacity group-hover:opacity-100 z-10 py-2 md:max-w-xl max-w-sm w-max">
                <div className='bg-white p-2 rounded-lg border-2 border-solid border-zinc-300'>
                    {hintMessage}
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
                    <Hint hintMessage="This is a hint." />
                    <label htmlFor="mainFilter" className="font-medium truncate text-gray-900">
                        Main filter
                    </label>
                </div>
                <div className="relative rounded-md shadow-sm">
                    <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md py-2 pl-4 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                    placeholder="John Doe"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <select
                            id="mainFilter"
                            name="mainFilter"
                            className="h-full rounded-md text-sm ring-2 ring-inset ring-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <option>Name</option>
                            <option>Username</option>
                            <option>Email</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='flex-initial flex items-center gap-2'>
                    <Hint hintMessage="This is a hint." />
                    <div className="font-medium truncate text-gray-900">
                        Other filter(s)
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className="flex-1 relative rounded-md shadow-sm">
                        <input
                        type="text"
                        name="price"
                        id="price"
                        className="block w-full rounded-md py-2 pl-4 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                        placeholder="John Doe"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <select
                                id="mainFilter"
                                name="mainFilter"
                                className="h-full rounded-md text-sm ring-2 ring-inset ring-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                    <div className='flex items-center'>
                        <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-red-800 bg-red-200 rounded-full'>
                            <div className='absolute w-3 h-0.5 bg-red-800' ></div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className="flex-1 relative rounded-md shadow-sm">
                        <input
                        type="text"
                        name="price"
                        id="price"
                        className="block w-full rounded-md py-2 pl-4 pr-20 text-gray-900 border-2 border-zinc-400 placeholder:text-zinc-400"
                        placeholder="John Doe"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <select
                                id="mainFilter"
                                name="mainFilter"
                                className="h-full rounded-md text-sm ring-2 ring-inset ring-zinc-400 bg-zinc-300 py-0 px-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                    <div className='flex items-center'>
                        <div className='relative flex items-center justify-center w-8 h-8 border-2 border-solid border-green-800 bg-green-200 rounded-full'>
                            <div className='absolute w-3 h-0.5 bg-green-800' ></div>
                            <div className='absolute w-0.5 h-3 bg-green-800' ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

function FiltersViewer() {
    const [filtersView, setFiltersView] = useState(false);

    const toggleFiltersView = () => {
        setFiltersView(!filtersView);
    };
    return (
        <div>
            <div className='w-full p-4 flex items-center justify-center'>
                <button className={`${filtersView === true ? 'my-0' : 'mb-48'} md:basis-1/2 basis-full rounded-lg px-8 py-2`} onClick={toggleFiltersView}> {filtersView === true ? '↑ Hide' : '↓ Show'} all filters</button>
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
    return (
        <div className='w-full h-10 bg-zinc-400'>
            
        </div>
    )
}


export default UserInput;
