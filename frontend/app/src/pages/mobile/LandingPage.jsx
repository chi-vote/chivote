import React from 'react';
import Page from '../../components/Page';
import chivoteLogo from '../../assets/images/chivote-logo-7x.png';
import "../../assets/styles/LandingPage.css";

const LandingPage = (props) => {
  return (
    <Page>
      <div className="landing-page">
        <img src={chivoteLogo} alt="Chi.Vote logo"/>
        <h1 className="header__tagline">
          Everything you need to know to vote in Chicago on
          <em className="is-darkblue-text"> Tuesday, Feb. 26th</em>
        </h1>
        <button
          className="button">Get Started</button>
        <button
          className="button"
          onClick={props.goCollective}>What is this?</button>
      </div>
    </Page>
  )
}

export default LandingPage;
