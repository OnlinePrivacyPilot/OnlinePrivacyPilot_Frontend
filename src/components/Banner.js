import React, { Component } from 'react';


class Banner extends Component {
    state = {  } 
    render() { 
        return (
        <div className='w-screen h-[80px] z-10 bg-zinc-400 fixed drop-shalow-lg' >
            <div className='toto font-bold mr-4 text-4xl'>OnlinePrivacyPilot</div>
            <div className='bannerlist'>
            <ul className='hiden md:flex'>
                <li>
                    Home
                </li>
                <li>
                    Documentation
                </li>
                <li>
                    About
                </li>
            </ul>
        </div>
        </div>);
    }
}
 
export default Banner;

