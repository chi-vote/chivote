import React, { Component } from 'react';

const LandingPage = require('./LandingPage').default;
const LandingPageMobile = require('./LandingPageMobile').default;
import Responsive from 'react-responsive';

import { Nav, Footer } from 'Components/common';

import styles from './styles.module.scss';

class Homepage extends Component {
  render() {
    return (
      <>
        <Nav classes={{ ...styles }} />
        <section className='section landing-page' id='page'>
          <Responsive minWidth={992}>
            <LandingPage />
          </Responsive>
          <Responsive maxWidth={991}>
            <LandingPageMobile />
          </Responsive>
        </section>
        <Footer />
      </>
    );
  }
}

// module.exports = Homepage;
export default Homepage;
