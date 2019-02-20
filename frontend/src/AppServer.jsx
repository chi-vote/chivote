import React, { Component } from 'react';
import 'Theme/styles/theme.scss';
import 'Theme/styles/theme.module.scss';

class App extends Component {
  render() {
    const PageComponent = require(`./pages/${this.props.component}`).default;

    return <PageComponent {...this.props} />;
  }
}

export default App;
