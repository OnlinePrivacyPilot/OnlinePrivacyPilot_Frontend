import React, { Component } from 'react';

class Description extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( <div className='bannerlist'>
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
        </div> );
    }
}
 
export default Description;