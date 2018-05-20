import React, { Component } from 'react';
import BarChart from './BarChart';
import './App.css';

import alertData from './data.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartWidth: 500,
      chartHeight: 300,
      alertData: alertData.data,
    };
  }
  render() {
  	const {chartHeight, chartWidth, alertData} = this.state;
    return (
      <section className="App">
        <header className="App-header">
          <h1 className="App-title">Alerts</h1>
        </header>
        <BarChart
          height = {chartHeight}
          width = {chartWidth}
          data = {alertData}
        />
      </section>
    );
  }
}

export default App;
