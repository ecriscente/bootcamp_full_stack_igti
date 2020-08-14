import React, { Component } from 'react';
import Bar from './Bar.js';
import { calculateSalaryFrom } from './salary.js';
import Header from './Header.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
    };
  }

  handleInputFullSalary = (salary) => {
    console.log(salary);

    this.setState({
      fullSalary: salary,
    });

    // handleCalculateSalary = (salary) => {
    //   salary = this.props.salary;
    //   const {
    //     baseINSS,
    //     discountINSS,
    //     baseIRPF,
    //     discountIRPF,
    //     netSalary,
    //   } = calculateSalaryFrom(salary);

    //   console.log(baseINSS);
    // };

    // console.log(baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary);
  };

  // handleChangeBar = (salary) => {
  //   const fullSalary = this.state.fullSalary;

  //   const bar1 = fullSalary;
  //   const bar2 = fullSalary;
  //   const bar3 = fullSalary;
  // };
  render() {
    const { fullSalary } = this.state;

    // document.getElementById('baseINSS').value = baseINSS;
    // document.getElementById('descontoINSS').value = descontoINSS;
    // document.getElementById('baseIRPF').value = baseIRPF;
    // document.getElementById('descontoIRPF').value = descontoIRPF;
    // document.getElementById('salarioLiquido').value = salarioLiquido;

    const {
      baseINSS,
      descontoINSS,
      baseIRPF,
      descontoIRPF,
      salarioLiquido,
    } = calculateSalaryFrom(this.handleInputFullSalary);

    return (
      <div className="App">
        <h1>React Salário</h1>
        <Header
          filter={fullSalary}
          onInputFullSalary={this.handleInputFullSalary}
        />
        {/* <div>
          <label for="fullSalary">Salário bruto:</label>
          <input id="fullSalary" type="number"></input>
        </div> */}
        <div className="inputs">
          <div className="onlyReading">
            <label htmlFor="baseINSS">Base INSS:</label>
            <input
              id="baseINSS"
              filter={fullSalary}
              value={baseINSS}
              onChange={this.handleInputFullSalary}
              type="number"
              readOnly
            />
          </div>
          <div className="onlyReading">
            <label htmlFor="descontoINSS">Desconto INSS:</label>
            <input
              id="descontoINSS"
              filter={fullSalary}
              value={descontoINSS}
              onChange={this.handleInputFullSalary}
              type="number"
              readOnly
            />
          </div>
          <div className="onlyReading">
            <label htmlFor="baseIRPF">Base IRPF:</label>
            <input
              id="baseIRPF"
              filter={fullSalary}
              value={baseIRPF}
              onChange={this.handleInputFullSalary}
              type="number"
              readOnly
            />
          </div>
          <div className="onlyReading">
            <label htmlFor="descontoIRPF">Desconto IRPF:</label>
            <input
              id="descontoIRPF"
              filter={fullSalary}
              value={descontoIRPF}
              onChange={this.handleInputFullSalary}
              type="number"
              readOnly
            />
          </div>
          <div className="onlyReading">
            <label htmlFor="salarioLiquido">Salário líquido:</label>
            <input
              id="salarioLiquido"
              filter={fullSalary}
              value={salarioLiquido}
              onChange={this.handleInputFullSalary}
              type="number"
              readOnly
            />
          </div>
        </div>
        <dir>
          <Bar />
        </dir>
      </div>
    );
  }
}
