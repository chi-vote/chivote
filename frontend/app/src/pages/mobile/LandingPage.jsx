import React from 'react';
import Page from '../../components/Page';
import chivoteLogo from '../../assets/images/chivote-logo-7x.png';
import "../../assets/styles/LandingPage.css";

const LandingPage = (props) => {
  return (
    <Page className="page page--landing has-text-centered">
      <img src={chivoteLogo} alt="Chi.Vote logo" className="mb-1"/>
      <h1 className="header__tagline is-size-4 mb-1">
        Everything you need to know to vote in Chicago on
        <em className="is-darkblue-text"> Tuesday, Feb. 26th</em>
      </h1>
      <button
        className="button get-started is-large">Get Started</button>
      <button
        className="button is-medium is-outlined"
        onClick={props.goCollective}>
        <p>What is this?</p>
        {/* <span className="icon">
          <i className="fa fa-lg fa-caret-down"></i>
        </span> */}
      </button>
    </Page>
  )
}

export default LandingPage;
