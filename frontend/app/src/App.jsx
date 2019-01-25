import React, { Component } from 'react';
import Header from './components/Header';
import LandingPageSlider from './pages/mobile/LandingPageSlider'
import Responsive from 'react-responsive';

import { hot } from 'react-hot-loader/root';

class App extends Component {
  render() {
    return (
      <div>
        <Responsive minWidth={992}>
          <Header/>
        </Responsive>
        <Responsive maxWidth={767}>
          <LandingPageSlider/>
        </Responsive>
      </div>
    );
  }
}

export default hot(App);
