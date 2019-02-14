import React, { Component, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Nav, Footer } from 'Components/common';
import 'Assets/styles/theme.scss';

class App extends Component {
  constructor(props) {
    super(props);
    // this.page = require(`Pages/${props.component}`).default;
    // this.page = import(`Pages/${props.component}`);
  }

  render() {
    const PageComponent = React.lazy(() =>
      import(/* webpackChunkName: "[request]" */ `Pages/${
        this.props.component
      }`)
    );

    // return React.createElement(this.page, this.props);
    return (
      <>
        <Nav />
        <Suspense fallback={<div style={{ height: 400 }}>Loading...</div>}>
          <PageComponent {...this.props} />
        </Suspense>
        <Footer />
      </>
    );
  }
}

export default hot(App);
