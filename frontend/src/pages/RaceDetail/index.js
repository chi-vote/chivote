import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import Page from 'Components/Page';
import { slide as SlideView } from 'react-burger-menu';
import CandidateView from 'Components/CandidateView';
import ReadMoreReact from 'Components/ReadMoreReact';
import ArticleFeed from './ArticleFeed';
import CandidateFeed from './CandidateFeed';
import StanceFeed from './StanceFeed';
import EventFeed from './EventFeed';
import LanguageToggle from 'Components/LanguageToggle';

import './style.scss';

export default class RaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.feed ? this.props.feed : 'candidates',
      currentCandidate: null,
      slideViewActive: false
    };
  }

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

  componentDidMount() {
    const currPath = window.location.pathname;
    const raceSlug = this.props.data.slug;

    let url = currPath.split(raceSlug)[0];
    url += raceSlug + '/';
    url += this.state.feed + '/';

    window.history.pushState({}, null, url);
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  renderFeed = () => {
    if (this.state.feed === 'candidates') {
      return (
        <CandidateFeed
          candidates={JSON.parse(this.props.candidates)}
          handleClick={this.setCandidateView}
        />
      );
    } else if (this.state.feed === 'articles') {
      return (
        <ArticleFeed
          articles={JSON.parse(this.props.data.articles)}
          feed_url={`/races/${this.props.data.slug}/rss.xml`}
        />
      );
    } else if (this.state.feed === 'stances') {
      return (
        <StanceFeed
          stances={JSON.parse(this.props.data.stances)}
          issues={JSON.parse(this.props.data.issues)}
          candidates={JSON.parse(this.props.candidates)}
        />
      );
    } else if (this.state.feed === 'events') {
      return <EventFeed slug={this.props.data.documenters_slug} />;
    }
  };

  render() {
    const { data } = this.props;
    const officeName = JSON.parse(data.office).office;

    const breadcrumb = (function(slug) {
      const currPath = window.location.pathname;
      const raceSlug = slug;
      const currPage = currPath.split(raceSlug)[0] + raceSlug + '/';
      const parentUrl = curr =>
        curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';

      return (
        <nav className='breadcrumb' aria-label='breadcrumbs'>
          <ul>
            <li>
              <a href={parentUrl(parentUrl(currPage))}>
                <FormattedMessage id='common.link.home' defaultMessage='Home' />
              </a>
            </li>
            <li>
              <a href={parentUrl(currPage)}>
                <FormattedMessage
                  id='common.link.all-races'
                  defaultMessage='All races'
                />
              </a>
            </li>
            <li className='is-active'>
              <a href={currPage} aria-current='page'>
                {officeName}
              </a>
            </li>
            <LanguageToggle />
          </ul>
        </nav>
      );
    })(this.props.data.slug);

    return (
      <div>
        <SlideView
          left
          width={320}
          isOpen={this.state.slideViewActive}
          onStateChange={this.unsetCandidateView}
          customBurgerIcon={false}
          // customCrossIcon={false}
        >
          {this.state.currentCandidate && (
            <CandidateView
              apiUrl={this.props.ballot_ready_api_url}
              data={this.state.currentCandidate}
            />
          )}
        </SlideView>
        <Page childClass='container page--detail'>
          {breadcrumb}
          <h1 className='page-heading title is-3'>
            <FormattedMessage
              id='RaceDetail.heading'
              defaultMessage='Race for {officeName}'
              values={{ officeName }}
            />
          </h1>
          {Parser(decode(data.description))}
          <div
            className={`field is-grouped is-grouped-multiline is-${
              this.state.feed
            }-active toggle-feed mt-1 mb-1`}
          >
            <div className='control'>
              <button
                className='button is-rounded is-large is-candidates'
                onClick={() => this.setState({ feed: 'candidates' })}
              >
                {/* Candidates */}
                <span className='icon'>
                  <i className='fa fa-lg fa-user-tie' />
                </span>
                <span className='button__label is-hidden-mobile'>
                  <FormattedMessage
                    id='RaceDetail.button.candidates'
                    defaultMessage='Candidates'
                  />
                </span>
              </button>
            </div>
            <div className='control'>
              <button
                className='button is-rounded is-large is-articles'
                onClick={() => this.setState({ feed: 'articles' })}
              >
                {/* Articles */}
                <span className='icon'>
                  <i className='fa fa-lg fa-newspaper' />
                </span>
                <span className='button__label is-hidden-mobile'>
                  <FormattedMessage
                    id='RaceDetail.button.articles'
                    defaultMessage='Articles'
                  />
                </span>
              </button>
            </div>
            <div className='control'>
              <button
                className='button is-rounded is-large is-stances'
                onClick={() => this.setState({ feed: 'stances' })}
                disabled={
                  !officeName.includes('Mayor') &&
                  !officeName.includes('Alcalde')
                }
              >
                {/* Stances */}
                <span className='icon'>
                  <i className='fa fa-lg fa-comment-dots' />{' '}
                </span>
                <span className='button__label is-hidden-mobile'>
                  <FormattedMessage
                    id='RaceDetail.button.stances'
                    defaultMessage='Stances'
                  />
                </span>
              </button>
            </div>
            <div className='control'>
              <button
                className='button is-rounded is-large is-events'
                onClick={() => this.setState({ feed: 'events' })}
              >
                {/* Events */}
                <span className='icon'>
                  <i className='fa fa-lg fa-calendar' />{' '}
                </span>
                <span className='button__label is-hidden-mobile'>
                  <FormattedMessage
                    id='RaceDetail.button.events'
                    defaultMessage='Events'
                  />
                </span>
              </button>
            </div>
          </div>
          {this.renderFeed()}
        </Page>
      </div>
    );
  }
}
