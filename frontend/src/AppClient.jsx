import React, { Component, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Nav, Footer } from 'Components/common';
import 'Theme/styles/theme.scss';

class App extends Component {
  render() {
    const PageComponent = React.lazy(() =>
      import(/* webpackChunkName: "[request]" */ `./pages/${
        this.props.component
      }`)
    );

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
