import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const navigation = [
    { name: 'Dashboard', to: '/', current: true },
    { name: 'Documentation', to: '/documentation', current: false },
    { name: 'About', to: '/about', current: false },
]

function Navbar() {
    const [navExpanded, setNavExpanded] = useState(false);
    const location = useLocation();

    const burgerClick = () => {
        setNavExpanded(!navExpanded);
    };

    return (
        <nav className="sticky top-0 bg-zinc-500 z-10">
        <div className="mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center md:hidden">
                <button type="button" onClick={burgerClick} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-zinc-400 hover:text-gray-300 border-2 border-zinc-400" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <h1 className='text-white text-2xl font-bold mr-4 md:text-3xl'>OnlinePrivacyPilot.</h1>
                </div>
                <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-4">
                    {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.to}
                        className={`
                            ${location.pathname === item.to ? 'bg-zinc-400 text-white' : 'text-gray-300 hover:bg-zinc-400 hover:text-white'}
                            rounded-md px-3 py-2 text-sm font-medium
                        `}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </Link>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className={`${navExpanded === true ? 'md:hidden' : 'hidden md:hidden'} absolute bg-zinc-500 w-full`} id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.to}
                    className={`
                        ${location.pathname === item.to ? 'bg-zinc-400 text-white' : 'text-gray-300 hover:bg-zinc-400 hover:text-white'}
                        block rounded-md px-3 py-2 text-base font-medium
                    `}
                    aria-current={item.current ? 'page' : undefined}
                    onClick={burgerClick}
                >
                    {item.name}
                </Link>
            ))}
            </div>
        </div>
        </nav>
    );
}

export default Navbar;
