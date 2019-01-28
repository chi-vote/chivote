import React, { Component } from 'react';
import Slider from 'react-slick';
import Page from 'Components/Page';
import chivoteLogo from 'Assets/images/chivote-logo-7x.png';
import questionsIcon from 'Assets/images/chivote-questions-icon.png';
import researchIcon from 'Assets/images/chivote-research-icon.png';
import readyIcon from 'Assets/images/chivote-ready-icon.png';
import './LandingPageMobile.scss';

const LandingPage = props => {
  return (
    <Page className="page page--landing has-text-centered">
      <img src={chivoteLogo} alt="Chi.Vote logo" className="mb-1" />
      <h1 className="header__tagline is-size-4 mb-1">
        Everything you need to know to vote in Chicago on
        <em className="is-darkblue-text"> Tuesday, Feb. 26th</em>
      </h1>
      <button className="button get-started is-large">Get Started</button>
      <button
        className="button is-medium is-outlined"
        onClick={props.goCollective}
      >
        <span>What is this?</span>
        {/* <span className="icon">
          <i className="fa fa-lg fa-caret-down"></i>
        </span> */}
      </button>
    </Page>
  );
};

class VotingStageSlider extends Component {
  state = {
    stage: 'questions'
  };

  prev = () => {
    this.refs.stageSlider.slickPrev();
  };

  next = () => {
    this.refs.stageSlider.slickNext();
  };

  chooseStage = stage => {
    this.setState({ stage });
    this.next();
  };

  stageSwitch = () => {
    switch (this.state.stage) {
      case 'questions':
        return (
          <div className="voter-stage is-mobile stage-questions has-text-centered">
            <img
              src={questionsIcon}
              alt=""
              className="voter-stage__image mb-1"
            />
            <div className="voter-stage__links">
              <a href="faq" className="button is-large is-rounded">
                Look through our FAQs
              </a>
            </div>
          </div>
        );
        break;
      case 'research':
        return (
          <div className="voter-stage is-mobile stage-research has-text-centered">
            <img
              src={researchIcon}
              alt=""
              className="voter-stage__image mb-1"
            />
            <div className="voter-stage__links">
              <ul>
                <li>
                  <a href="races" className="button is-large is-rounded">
                    Explore the races
                  </a>
                </li>
                <li>
                  <a href="ask" className="button is-large is-rounded">
                    Ask us anything
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'ready':
        return (
          <div className="voter-stage is-mobile stage-ready has-text-centered">
            <img src={readyIcon} alt="" className="voter-stage__image mb-1" />
            <div className="voter-stage__links">
              <a href="quiz" className="button is-large is-rounded">
                Take the quiz!
              </a>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  render() {
    const settings = {
      slidesToScroll: 1,
      dots: false,
      infinite: false,
      draggable: false,
      swipe: false,
      swipeToSlide: false
    };

    return (
      <Slider {...settings} ref="stageSlider">
        <div>
          <Page className="page page--landing has-text-centered">
            <img src={chivoteLogo} alt="Chi.Vote logo" className="mb-1" />
            <h1 className="header__tagline is-size-4 mb-1">
              Everything you need to know to vote in Chicago on
              <em className="is-darkblue-text"> Tuesday, Feb. 26th</em>
            </h1>
            <button className="button get-started is-large" onClick={this.next}>
              Get Started
            </button>
            <button
              className="button is-medium is-outlined is-rounded"
              onClick={this.props.goCollective}
            >
              <span>What is this?</span>
              {/* <span className="icon">
                <i className="fa fa-lg fa-caret-down"></i>
              </span> */}
            </button>
          </Page>
        </div>
        <div className="columns is-gapless voting-choices">
          <div className="column">
            <div
              onClick={() => this.chooseStage('questions')}
              className="voter-stage is-mobile stage-questions has-text-centered"
            >
              {/* <img src={questionsIcon} alt="" className="voter-stage__image"/> */}
              <p className="voter-stage__cta is-lsb is-size-3 is-red-text">
                I don't know where to start...
              </p>
            </div>
          </div>
          <div className="column">
            <div
              onClick={() => this.chooseStage('research')}
              className="voter-stage is-mobile stage-research has-text-centered"
            >
              {/* <img src={researchIcon} alt="" className="voter-stage__image"/> */}
              <p className="voter-stage__cta is-lightblue-text is-lsb is-size-3">
                I'm ready to research candidates and issues.
              </p>
            </div>
          </div>
          <div className="column">
            <div
              onClick={() => this.chooseStage('ready')}
              className="voter-stage is-mobile stage-ready has-text-centered"
            >
              {/* <img src={readyIcon} alt="" className="voter-stage__image"/> */}
              <p className="voter-stage__cta is-lsb is-size-3">
                I'm ready to vote!
              </p>
            </div>
          </div>
        </div>
        <div className="last-stage">{this.stageSwitch()}</div>
      </Slider>
    );
  }
}

export default VotingStageSlider;
// export default LandingPage;
