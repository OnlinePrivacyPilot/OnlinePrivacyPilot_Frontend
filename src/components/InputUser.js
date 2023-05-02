import React, { Component } from 'react';
import CheckboxList from './Searchoptions';
import axios from 'axios'

class InputUSer extends Component {
    state = { 
        selectedOption: "option1", 
        showFilterOptions: false ,
        showSearchOptions: false,
        inputValue: "",
        filterValue: "",
        searchOptions: [
            { label: 'active_search', checked: false },
            { label: 'search_depth', checked: true },
        ],
    }
    
    // Showing states
    handleFilterTypeButtonState = (e) => {
        this.setState(state => ({
            showFilterOptions: !state.showFilterOptions
          }));
    };

    handleSearchOptions = (e) => {
        this.setState(state => ({
            showSearchOptions: !state.showSearchOptions
          }));
    };

    handleSearchOptionsChange = (updatedOptions) => {
        this.setState({ searchOptions: updatedOptions });
    };

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };


    handleSubmit = () => {
        const selectedItems = Object.values(this.state.searchOptions)
        .filter(item => {
            if (item.checked == true){
                return item.label
            }
        })
        .map(item => item.label);

        axios.get('http://127.0.0.1:5000/api', {
            params: {
                target: this.state.inputValue,
                filters: selectedItems.join(',')
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    
    render() {
        return (
        <div className="flex w-full flex-col justify-cente items-center" style={{ width: '100%' }}>
            {/* input box main filters */}
            <div className='box-border flex w-full items-center justify-between rounded-full border-2 pl-6 pr- border-black bg-transparent'>
                <div className='flex items-center'>
                    {/* icon information */}
                    <span className='text-gray-600'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd'd='M10 18a8 8 0 100-16 8 8 0 000 16zm1-9h-2v5h2v-5zm0-3h-2v2h2V6z'clipRule='evenodd'/>
                        </svg>    
                    </span>
                </div>
                {/* button with options and input */}
                <input className='box-border flex w-full items-center justify-between m-2' type='text' placeholder='Main filter' value={this.state.inputValue} onChange={this.handleInputChange}/>
                <button className='px-4 py-2 rounded-full' onClick={() => this.handleOptionChange}>
                    <select className='bg-transparent' value={this.state.selectedOption} onChange={this.handleOptionChange}>
                        <option value='option1'>name</option>
                        <option value='option2'>username</option>
                        <option value='option3'>e-mail</option>
                    </select>
                </button>        
            </div>
            {/* optional filters button*/}
            <div className='flex justify-start p-4 flex-shrink'>
                <button className='px-1 py-1 rounded' onClick={this.handleFilterTypeButtonState}>
                {this.state.showFilterOptions ? 'Hide filters' : 'Add optional filters'}
                </button>
            </div>
            {/* optional filters input */}
            {this.state.showFilterOptions && (
            <div className='flex justify-end box-border border-2 flex-grow'>
                <input className='box-border flex w-full items-center justify-between mr-2' type='text' placeholder='Additional filter'/>
                <button className='px-4 py-2 rounded-full' onClick={() => this.handleOptionChange}>
                <select className='bg-transparent' value={this.state.selectedOption} onChange={this.handleOptionChange}>
                    <option value='option1'>occupation</option>
                    <option value='option2'>location</option>
                </select>
                </button>
            </div>
            )}
            {/* search options button and get my footprint button */}
            <div className='flex items-center p-4'>
                    {/* icon information */}
                    <span className='text-gray-600'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd'd='M10 18a8 8 0 100-16 8 8 0 000 16zm1-9h-2v5h2v-5zm0-3h-2v2h2V6z'clipRule='evenodd'/>
                        </svg>
                    </span>
                    <button className='px-4 py-2 rounded-full m-2' onClick={this.handleSearchOptions}>
                        Search options
                    </button>
                    <button className='px-4 py-2 rounded-full m-2' onClick={this.handleSubmit}>
                        GET MY FINGERPRINT
                    </button>
            </div>
            {/* search options display depending on the state  active search, depth*/}
            <div className={!this.state.showSearchOptions ? 'hidden' :' bg-zinc-200 w-full px-8'}>
                <CheckboxList searchOptions={this.state.searchOptions} onSearchOptionsChange={this.handleSearchOptionsChange}/>
            </div>
        </div>
        
      
    );
    }
}
 
export default InputUSer;