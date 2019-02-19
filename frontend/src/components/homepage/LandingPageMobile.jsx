import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Slider from 'react-slick';
import { SiteLogo } from 'Theme/images';
import { questionsIcon, researchIcon, readyIcon } from './icons';
import './LandingPageMobile.scss';
import { LanguageToggle } from 'Components/common';

class VotingStageSlider extends Component {
  state = {
    locale: this.props.intl.locale,
    stage: 'questions',
    slideIndex: 0
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
    const urlRoot = this.state.locale == 'es' ? '/es/' : '/';

    switch (this.state.stage) {
      case 'questions':
        return (
          <div className='voter-stage is-mobile stage-questions has-text-centered'>
            <img
              src={questionsIcon}
              alt=''
              className='voter-stage__image mb-1'
            />
            <div className='voter-stage__links'>
              <ul>
                <li>
                  <a
                    href={urlRoot + 'faq/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-faq'
                      defaultMessage='Read through the FAQ'
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={urlRoot + 'quiz/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-quiz'
                      defaultMessage='Take the quiz'
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
        break;
      case 'research':
        return (
          <div className='voter-stage is-mobile stage-research has-text-centered'>
            <img
              src={researchIcon}
              alt=''
              className='voter-stage__image mb-1'
            />
            <div className='voter-stage__links'>
              <ul>
                <li>
                  <a
                    href={urlRoot + 'races/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-races'
                      defaultMessage='Explore the races'
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={urlRoot + 'ask/'}
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-ask'
                      defaultMessage='Ask us anything'
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'ready':
        return (
          <div className='voter-stage is-mobile stage-ready has-text-centered'>
            <img src={readyIcon} alt='' className='voter-stage__image mb-1' />
            <div className='voter-stage__links'>
              <ul>
                <li>
                  <a
                    href={
                      this.state.locale == 'es'
                        ? 'https://chicagoelections.com/sp/register-to-vote-change-of-address.html'
                        : 'https://chicagoelections.com/en/register-to-vote-change-of-address.html'
                    }
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-register'
                      defaultMessage='Get registered'
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={
                      this.state.locale == 'es'
                        ? 'https://chicagoelections.com/sp/your-voter-information.html'
                        : 'https://chicagoelections.com/en/your-voter-information.html'
                    }
                    className='button is-large is-rounded'
                  >
                    <FormattedMessage
                      id='Homepage.LandingPage.button-polling'
                      defaultMessage='Find your polling place'
                    />
                  </a>
                </li>
              </ul>
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
      swipeToSlide: false,
      beforeChange: (curr, next) => this.setState({ slideIndex: next })
    };

    return (
      <>
        <Slider {...settings} ref='stageSlider'>
          <div>
            <section className='page page--landing has-text-centered'>
              <div className='header__wrapper'>
                <img src={SiteLogo} alt='Chi.vote logo' className='mb-1' />
                <h1 className='header__tagline is-size-4 mb-1'>
                  <FormattedMessage
                    id='Homepage.LandingPageMobile.tagline'
                    defaultMessage='Everything you need to know to vote in Chicago on Tuesday, Feb. 26th'
                  />
                </h1>
                <button
                  className='button get-started is-large is-rounded'
                  onClick={this.next}
                >
                  <FormattedMessage
                    id='Homepage.LandingPageMobile.get-started'
                    defaultMessage='Get started →'
                  />
                </button>
              </div>
            </section>
          </div>
          <div className='columns is-gapless voting-choices'>
            <div className='column'>
              <div
                onClick={() => this.chooseStage('questions')}
                className='voter-stage is-mobile stage-questions has-text-centered'
              >
                {/* <img src={questionsIcon} alt="" className="voter-stage__image"/> */}
                <p className='voter-stage__cta is-lsb is-size-3 is-red-text'>
                  <FormattedMessage
                    id='Homepage.LandingPage.heading-1'
                    defaultMessage='Where do I start?'
                  />
                </p>
              </div>
            </div>
            <div className='column'>
              <div
                onClick={() => this.chooseStage('research')}
                className='voter-stage is-mobile stage-research has-text-centered'
              >
                {/* <img src={researchIcon} alt="" className="voter-stage__image"/> */}
                <p className='voter-stage__cta is-lightblue-text is-lsb is-size-3'>
                  <FormattedMessage
                    id='Homepage.LandingPage.heading-2'
                    defaultMessage="I'm ready to learn."
                  />
                </p>
              </div>
            </div>
            <div className='column'>
              <div
                onClick={() => this.chooseStage('ready')}
                className='voter-stage is-mobile stage-ready has-text-centered'
              >
                {/* <img src={readyIcon} alt="" className="voter-stage__image"/> */}
                <p className='voter-stage__cta is-lsb is-size-3'>
                  <FormattedMessage
                    id='Homepage.LandingPage.heading-3'
                    defaultMessage="I'm ready to vote!"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className='last-stage'>{this.stageSwitch()}</div>
        </Slider>
        <button
          className='button is-small back-button'
          onClick={this.prev}
          disabled={this.state.slideIndex == 0}
        >
          <span className='icon'>
            <i className='fas fa-backward' />
          </span>
          <FormattedMessage
            id='Homepage.LandingPageMobile.back-button'
            defaultMessage='Back'
          />
        </button>
        <LanguageToggle disabled={this.state.slideIndex != 0} />
      </>
    );
  }
}

export default injectIntl(VotingStageSlider);
