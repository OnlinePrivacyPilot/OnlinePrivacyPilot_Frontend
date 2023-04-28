import React, { Component } from 'react';

class InputUSer extends Component {
    state = {  } 
    render() { 
        return (
        <div className="flex w-full flex-col justify-center items-center" style={{ width: '100%' }}>
            <div className='box-border flex w-full items-center justify-between rounded-full border-2 pl-6 pr- border-black bg-transparent'>
                <input className='box-border flex w-10 items-center justify-between'/>
                <button className='font-bold inline-block overflow-hidden max-w-full transition-all border-solid border-2 rounded-[30px] tracking-ff-tight text-body-base leading-none px-[1.75rem] py-[1.1875rem] border-[transparent] text-white bg-shade-100 hover:bg-shade-70 active:bg-shade-50 disabled:bg-shade-20 disabled:text-shade-30 whitespace-nowrap'>GET MY FINGERPRINT</button>
            </div>
        </div>
      
    );
    }
}
 
export default InputUSer;