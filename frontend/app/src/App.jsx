import React, { Component } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LandingPageSlider from './pages/mobile/LandingPageSlider';
import Responsive from 'react-responsive';

import { hot } from 'react-hot-loader/root';

class App extends Component {
  render() {
    return (
      <div className="landing-page">
        <Responsive minWidth={992}>
          <LandingPage/>
        </Responsive>
        <Responsive maxWidth={767}>
          <LandingPageSlider/>
        </Responsive>
      </div>
    );
  }
}

export default hot(App);
