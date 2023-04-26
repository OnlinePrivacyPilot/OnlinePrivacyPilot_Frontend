import React, { Component } from 'react';
import Header from './Header';
import Description from './Description';


class Banner extends Component {
    state = {  } 
    render() { 
        return (
        <div>
            <Header />
            <Description />
        </div>);
    }
}
 
export default Banner;

