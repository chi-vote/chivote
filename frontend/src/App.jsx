import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import 'Assets/styles/theme.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.page = require(`Pages/${props.component}`).default;
  }

  render() {
    return React.createElement(this.page, this.props);
  }
}

export default hot(App);
