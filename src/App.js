import React, { Component } from 'react';
import './App.css';
import ContainerWeather from './components/ContainerWeather';

class App extends Component {
  render () {
    return (
      <div className="App">
        <ContainerWeather />
      </div>
    );
  }
}

export default App;
