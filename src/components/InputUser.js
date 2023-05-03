import React, { Component } from 'react';
import CheckboxList from './Searchoptions';
import axios from 'axios'

class InputUSer extends Component {
    constructor(props){
        super(props);

        this.state = { 
            selectedOption: "option1", 
            showFilterOptions: false ,
            showSearchOptions: false,
            inputValue: "",
            filterValue: "",
            activeSearch: 0,
            depthValue: 2
        }

        this.handleRangeChange = this.handleRangeChange.bind(this);
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

    handleSearchOptionsChange = (event) => {
        const otherCheckbox = document.querySelector('#activeS');

        otherCheckbox.addEventListener('change', () => {
        if (otherCheckbox.checked) {
            this.setState({ activeSearch: 1 });
        } else {
            this.setState({ activeSearch: 0 });
        }
        });
        console.log(this.state.activeSearch)
      };

    //Value retrieving
    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    handleRangeChange = (event) => {
        this.setState({ depthValue: event.target.value });
    };

    handleDepthInput = (event) => {
        this.setState({ depthValue: event.target.value });
    };


    handleSubmit = async () => {

        const params = {
            target: this.state.inputValue,
            depth: this.state.depthValue,
            active_search: this.state.activeSearch
        };

        console.log(params)

        await axios.get('http://127.0.0.1:5000/api/', { params })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    


    
    render() {
        document.addEventListener('DOMContentLoaded', () => {
            const rangeInput = document.querySelector('#depth');
            const depthLabel = document.querySelector('#depth-label');
          
            rangeInput.addEventListener('input', (event) => {
              const depthValue = event.target.value;
              depthLabel.textContent = depthValue;
              rangeInput.value = depthValue;
            });
          });

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
                <h2 class="text-base font-semibold leading-7 text-gray-900">Search options</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">Here you can tune your choice regarding your preferences about the search.</p>

                <div class="mt-10 space-y-2">
                    <div class="mt-6 space-y-2">
                        <div class="relative flex gap-x-3">
                            <div class="text-sm leading-6">
                                <label for="offers" class="font-medium text-gray-900">Search depth</label>
                                <p class="text-gray-500">Here you can choose the level of recursion you want. In other words how depth the tool will investigate your fingerprint.</p>
                            </div>
                            <div class="flex h-6 items-center font-sans">
                                <input id="depth" name="depth" type="range" min="0" max="10" value={this.state.depthValue} class="h-4 w-full rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={this.handleRangeChange}/>
                                <label for="depth">Depth</label>
                                <span id="depth-label" class="ml-2 ">{this.state.depthValue}</span>
                            </div>
                        </div>
                        <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <input id="activeS" name="offers" type="checkbox" value='active' class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onClick={this.handleSearchOptionsChange}/>
                            </div>
                            <div class="text-sm leading-6">
                                <label for="activeS" class="font-medium text-gray-900">Active search</label>
                                <p class="text-gray-500">To have the most exaustive overview of your data online, we propose an active search based on OSINT techniques. You can either let it desactived or activate it here</p>
                            </div>
                        </div>
                    </div> 
                </div>
        </div>
        </div>
        
      
    );
    }
}
 
export default InputUSer;