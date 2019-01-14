import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

class App extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <h1>Hello world!</h1>
        <h2>Env: {this.props.env}</h2>
      </div>
    );
  }
}

export default hot(App);
