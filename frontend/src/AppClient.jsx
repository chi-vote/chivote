import React, { Component, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import 'Theme/styles/theme.scss';
import 'Theme/styles/theme.module.scss';

class App extends Component {
  render() {
    const PageComponent = React.lazy(() =>
      import(/* webpackChunkName: "[request]" */ `./pages/${
        this.props.component
      }`)
    );

    return (
      <Suspense fallback={<div style={{ height: 400 }}>Loading...</div>}>
        <PageComponent {...this.props} />
      </Suspense>
    );
  }
}

export default hot(App);
