import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Header from './containers/Header';

class App extends Component {
  render() {
    return (
        <div className = "maindiv">
      <Header />
      <Login />
        </div>
    );
  }
}

export default App;
