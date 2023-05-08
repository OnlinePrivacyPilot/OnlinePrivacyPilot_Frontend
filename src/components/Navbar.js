import React, { useState } from 'react';


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Documentation', href: '#', current: false },
  { name: 'About', href: '#', current: false },
]

function Navbar() {

  const [navExpanded, setNavExpanded] = useState(false);

  const burgerClick = () => {
    setNavExpanded(!navExpanded);
  };

  return (
    <nav class="sticky top-0 bg-zinc-500 z-10">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="inset-y-0 left-0 flex items-center md:hidden">
            <button type="button" onClick={burgerClick} class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <h1 className='text-white text-xl font-bold mr-4 md:text-3xl'>OnlinePrivacyPilot.</h1>
            </div>
            <div class="hidden md:ml-6 md:block">
              <div class="flex space-x-4">
              {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`
                        ${item.current ? 'bg-zinc-400 text-white' : 'text-gray-300 hover:bg-zinc-400 hover:text-white'}
                        rounded-md px-3 py-2 text-sm font-medium
                      `}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class={`${navExpanded === true ? 'md:hidden' : 'hidden md:hidden'} absolute bg-zinc-500 w-full`} id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  ${item.current ? 'bg-zinc-400 text-white' : 'text-gray-300 hover:bg-zinc-400 hover:text-white'}
                  block rounded-md px-3 py-2 text-base font-medium
                `}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
