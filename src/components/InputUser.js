import React, { Component } from 'react';

class InputUSer extends Component {
    state = { 
        selectedOption: "option1", 
        filter_button: false 
    }
    
    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    };

    handleFilterTypeButtonState = (e) => {
        this.setState(state => ({
            filter_button: !state.filter_button
          }));
    };

    
    render() { 
        //const [showDropdown, setShowDropdown] = useState(false);

        return (
        <div className="flex w-full flex-col justify-center items-center" style={{ width: '100%' }}>
            <div className='box-border flex w-full items-center justify-between rounded-full border-2 pl-6 pr- border-black bg-transparent'>
                <div className='flex items-center'>
                    <span className='text-gray-400'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd'd='M10 18a8 8 0 100-16 8 8 0 000 16zm1-9h-2v5h2v-5zm0-3h-2v2h2V6z'clipRule='evenodd'/>
                        </svg>
                    </span>
                </div>
            <input className='box-border flex w-10 items-center justify-between'/>
            <button className='px-4 py-2 rounded' onClick={() => this.handleFilterTypeButtonState()}>Select the type</button>          
            </div>
            {this.state.filter_button && (
              <select className='mx-2' value={this.state.selectedOption} onChange={this.handleOptionChange}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </select>
            )}
        </div>
      
    );
    }
}
 
export default InputUSer;