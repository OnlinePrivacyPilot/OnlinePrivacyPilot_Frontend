import React, { Component } from 'react';
import { BanIcon, BeakerIcon, MenuIcon, XICon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react';



class Banner extends Component {

  state = {
    nav: true
  };

  onClick()
  {
    this.setState(state => ({
      nav: !state.nav
    }));
  }

  render() {
    return (
      <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
        <div className='px-2 flex justify-between items-center w-full h-full'>
          <div className='flex items-center'>
            <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>OnlinePrivacyPilot.</h1>
            <ul className='hidden md:flex'>
              <li>Home</li>
              <li>About</li>
              <li>Documentation</li>
              <li>Test</li>
            </ul>
          </div>
          <div className='hidden md:flex pr-4'>
            <button className='border-none bg-transparent text-black mr-4'>
              Sign In
            </button>
            <button className='px-8 py-3'>Sign Up</button>
          </div>
          <div className='md:hidden' onClick={this.onClick.bind(this)}>
            {!this.state.nav ? <MenuIcon className='w-5' /> : <BanIcon className='w-5' />}
            
          </div>
        </div>


        <ul className={!this.state.nav ? 'hidden' :'absolute bg-zinc-200 w-full px-8 md:hidden'}>
          <li className='border-b-2 border-zinc-300 w-full'>Home</li>
          <li className='border-b-2 border-zinc-300 w-full'>About</li>
          <li className='border-b-2 border-zinc-300 w-full'>Documentation</li>
          <li className='border-b-2 border-zinc-300 w-full'>Test</li>
          <li className='border-b-2 border-zinc-300 w-full'>Test</li>

          <div className='flex flex-col my-4'>
            <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4'>Sign In</button>
            <button className='px-8 py-3'>Sign Up</button>
          </div>
        </ul>
      </div>);
  }
}

export default Banner;