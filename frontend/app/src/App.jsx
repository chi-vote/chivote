import React, { Component } from 'react';
import Header from './components/Header';
import { hot } from 'react-hot-loader/root';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}

export default hot(App);
