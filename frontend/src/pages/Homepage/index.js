import React, { Component } from 'react';

const LandingPage = require('./LandingPage').default;
const LandingPageMobile = require('./LandingPageMobile').default;
import Responsive from 'react-responsive';

import { Page } from 'Components/common';

class Homepage extends Component {
  render() {
    return (
      <Page sectionClass='landing-page'>
        <Responsive minWidth={992}>
          <LandingPage />
        </Responsive>
        <Responsive maxWidth={991}>
          <LandingPageMobile />
        </Responsive>
      </Page>
    );
  }
}

// module.exports = Homepage;
export default Homepage;
