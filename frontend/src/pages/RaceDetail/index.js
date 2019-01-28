import React, { Component } from 'react';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import Responsive from 'react-responsive';
import Page from 'Components/Page';
import { slide as SlideView } from 'react-burger-menu';
import CandidateView from 'Components/CandidateView';
import ReadMoreReact from 'Components/ReadMoreReact';
import ArticleFeed from './ArticleFeed';
import CandidateFeed from './CandidateFeed';
import StanceFeed from './StanceFeed';

import './style.scss';

export default class RaceDetail extends Component {
  state = {
    feed: 'candidates',
    currentCandidate: null,
    slideViewActive: false
  };

  setCandidateView = candidateObj => {
    this.setState({
      slideViewActive: true,
      currentCandidate: candidateObj
    });
  };

  unsetCandidateView = state => {
    this.setState({
      slideViewActive: state.isOpen
    });
  };

  renderFeed = () => {
    if (this.state.feed === 'candidates') {
      return (
        <CandidateFeed
          candidates={JSON.parse(this.props.candidates)}
          handleClick={this.setCandidateView}
        />
      );
    } else if (this.state.feed === 'articles') {
      return <ArticleFeed articles={JSON.parse(this.props.data.articles)} />;
    } else if (this.state.feed === 'stances') {
      return (
        <StanceFeed
          stances={JSON.parse(this.props.data.stances)}
          issues={JSON.parse(this.props.data.issues)}
          candidates={JSON.parse(this.props.candidates)}
        />
      );
    }
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        {/* <Responsive maxWidth={767}> */}
        <SlideView
          left
          width={320}
          isOpen={this.state.slideViewActive}
          onStateChange={this.unsetCandidateView}
          customBurgerIcon={false}
          customCrossIcon={false}
        >
          {this.state.currentCandidate && (
            <CandidateView data={this.state.currentCandidate} />
          )}
        </SlideView>
        {/* </Responsive> */}
        <Page
          className="container page page--detail page--inner"
          heading={`Race for ${JSON.parse(data.office).office}`}
        >
          <ReadMoreReact
            text={Parser(decode(data.description))}
            min={150}
            ideal={200}
            max={300}
            className="race__description"
          />
          <div className={`field is-grouped is-${this.state.feed}-active mb-1`}>
            <div className="control is-expanded">
              <button
                className="button is-rounded is-large is-candidates"
                onClick={() => this.setState({ feed: 'candidates' })}
              >
                {/* Candidates */}
                <span className="icon">
                  <i className="fa fa-lg fa-user-tie" />
                </span>
                <span className="label is-hidden-mobile">Candidates</span>
              </button>
            </div>
            <div className="control is-expanded">
              <button
                className="button is-rounded is-large is-articles"
                onClick={() => this.setState({ feed: 'articles' })}
              >
                {/* Articles */}
                <span className="icon">
                  <i className="fa fa-lg fa-newspaper" />
                </span>
                <span className="label is-hidden-mobile">Articles</span>
              </button>
            </div>
            <div className="control is-expanded">
              <button
                className="button is-rounded is-large is-stances"
                onClick={() => this.setState({ feed: 'stances' })}
              >
                {/* Stances */}
                <span className="icon">
                  <i className="fa fa-lg fa-comment-dots" />{' '}
                </span>
                <span className="label is-hidden-mobile">Stances</span>
              </button>
            </div>
          </div>
          {this.renderFeed()}
        </Page>
      </div>
    );
  }
}
