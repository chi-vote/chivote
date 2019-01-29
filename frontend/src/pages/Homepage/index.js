import React, { Component } from 'react';

import LandingPage from './LandingPage';
import LandingPageSlider from './LandingPageSlider';
import Responsive from 'react-responsive';

import Page from 'Components/Page';

class Homepage extends Component {
  render() {
    return (
      <Page sectionClass="landing-page">
        <div>
          <Responsive minWidth={992}>
            <LandingPage />
          </Responsive>
          <Responsive maxWidth={991}>
            <LandingPageSlider />
          </Responsive>
        </div>
      </Page>
    );
  }
}

// module.exports = Homepage;
export default Homepage;
