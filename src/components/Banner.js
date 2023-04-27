import React, { Component } from 'react';
import Header from './Header';
import Description from './Description';


class Banner extends Component {
    state = {  } 
    render() { 
        return (
        <div className='w-screen h-[80px] z-10 bg-zinc-400 fixed drop-shalow-lg' >
            <Header />
            <Description />
        </div>);
    }
}
 
export default Banner;

