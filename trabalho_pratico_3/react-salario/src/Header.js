import React, { Component } from 'react';

export default class Header extends Component {
  handleInputFullSalary = (event) => {
    console.log(event.target.value);
  };

  render() {
    const { salary } = this.props;

    return (
      <div>
        <div>
          <label htmlFor="fullSalary">Salário bruto:</label>
        </div>
        <div>
          <input
            type="number"
            value={salary}
            onChange={this.handleInputFullSalary}
            min="0"
            name="salary"
            id="fullSalary"
          />
        </div>
      </div>
    );
  }
}
