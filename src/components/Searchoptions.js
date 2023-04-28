import React, { Component } from 'react';

class CheckboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, label: "Active search", checked: false },
        { id: 2, label: "Search depth", checked: true },
      ]
    };
  }

  handleCheckboxChange = (id) => {
    const updatedItems = this.state.items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    this.setState({ items: updatedItems });
  };

  render() {
    return (
      <div className="flex flex-col">
        {this.state.items.map((item) => (
          <label key={item.id} className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox mr-2"
              checked={item.checked}
              onChange={() => this.handleCheckboxChange(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    );
  }
}

export default CheckboxList;