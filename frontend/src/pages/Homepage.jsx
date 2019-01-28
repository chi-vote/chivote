import React, { Component } from 'react';

import LandingPage from 'Pages/LandingPage';
import LandingPageSlider from 'Pages/mobile/LandingPageSlider';
import Responsive from 'react-responsive';

export default class Homepage extends Component {
  render() {
    return (
      <div className="landing-page">
        <Responsive minWidth={992}>
          <LandingPage />
        </Responsive>
        <Responsive maxWidth={767}>
          <LandingPageSlider />
        </Responsive>
      </div>
    );
  }
}
