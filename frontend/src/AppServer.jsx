import React, { Component } from 'react';
import { Nav, Footer } from 'Components/common';
import 'Theme/styles/theme.scss';
import 'Theme/styles/theme.module.scss';

class App extends Component {
  render() {
    const PageComponent = require(`./pages/${this.props.component}`).default;

    return (
      <>
        <Nav />
        <PageComponent {...this.props} />
        <Footer />
      </>
    );
  }
}

export default App;
