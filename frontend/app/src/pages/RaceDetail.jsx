import React, { Component } from 'react';
import Parser from 'html-react-parser';
import Page from '../components/Page';
import List from '../components/List';
import { slide as SlideView } from 'react-burger-menu';
import CandidateView from '../components/CandidateView';
import CandidateItem from '../components/CandidateItem';
import ArticleItem from '../components/ArticleItem';
import StanceItem from '../components/StanceItem';
import _ from 'lodash';

export default class RaceDetail extends Component {
  state = {
    feed: 'candidates',
    candidateDict: {},
    currentCandidate: null,
    slideViewActive: false
  };

  componentDidMount() {
    const dict = {};
    const candidates = JSON.parse(this.props.candidates);
    for (let i = 0; i < candidates.length; i++) {
      const element = candidates[i];
      dict[element.pk] = element.fields.full_name;
    }

    this.setState({ candidateDict: dict });
  }

  setCandidateView = candidateObj => {
    // console.log('hit setCandidateView');

    this.setState({
      slideViewActive: true,
      currentCandidate: candidateObj
    });
  };

  unsetCandidateView = state => {
    // console.log(state);
    this.setState({
      slideViewActive: state.isOpen
    });
  };

  renderFeed = () => {
    const articles = JSON.parse(this.props.data.articles).map(item => (
      <ArticleItem data={item} />
    ));

    if (this.state.feed === 'candidates') {
      return (
        <section id="the-candidates">
          <h2 className="page-heading title is-4">Candidates</h2>
          <List className="candidates-list">
            {JSON.parse(this.props.candidates).map(item => (
              <CandidateItem
                key={item.pk}
                id={item.pk}
                handleClick={this.setCandidateView}
                data={item.fields}
              />
            ))}
          </List>
        </section>
      );
    } else if (this.state.feed === 'articles') {
      return (
        <section id="the-newsfeed">
          <h2 className="page-heading title is-4">Articles</h2>
          {articles.length ? (
            articles
          ) : (
            <div className="list-item">
              <span className="is-lightblue-text has-text-centered is-block is-fullwidth">
                No related articles yet
              </span>
            </div>
          )}
        </section>
      );
    } else if (this.state.feed === 'stances') {
      const feed = [];
      const { stances } = this.props.data;

      const groupedStances = _(JSON.parse(stances))
        .groupBy(x => x.fields.issue)
        .map((value, key) => ({ issue: key, stances: value }))
        .value();

      for (const issueObj of Object.values(groupedStances)) {
        const { issue, stances } = issueObj;

        feed.push(
          <div>
            <h3 className="has-text-white title is-5">{`On ${
              this.props.data.issueDict[issue]
            }...`}</h3>
            {stances.map(item => (
              <StanceItem
                data={item.fields}
                candidate={
                  _.find(JSON.parse(this.props.candidates), c => {
                    return c.pk == item.fields.candidate;
                  }).fields
                }
              />
            ))}
          </div>
        );
      }
      return (
        <section id="the-stances">
          <h2 className="page-heading title is-4">Stances</h2>
          {feed}
        </section>
      );
    }
  };

  render() {
    const { data, candidates } = this.props;
    // const parsedData = JSON.parse(data.stances);
    // console.log(parsedData);

    return (
      <div className="container">
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
        <Page
          className="page page--detail page--inner"
          heading={`Race for ${JSON.parse(data.office).office}`}
        >
          {Parser(Parser(data.description))}
          {/* TODO: why do I need to nest these? */}
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
              </button>
            </div>
            <div className="control is-expanded">
              <button
                className="button is-rounded is-large is-stances"
                onClick={() => this.setState({ feed: 'stances' })}
              >
                {/* Stances */}
                <span className="icon">
                  <i className="fa fa-lg fa-comment-dots" />
                </span>
              </button>
            </div>
          </div>
          {this.renderFeed()}
          {/* {this.state.feed === 'candidates' ? (
            <section id="the-candidates">
              <h2 className="page-heading title is-5">Candidates</h2>
              <List className="candidates-list">
                {JSON.parse(candidates).map(item => (
                  <CandidateItem
                    key={item.pk}
                    id={item.pk}
                    handleClick={this.setCandidateView}
                    data={item.fields}
                  />
                ))}
              </List>
            </section>
          ) : (
            <section id="the-newsfeed">
              <h2 className="page-heading title is-5">Articles</h2>
              {
                articles.length ? articles :
                <div className="list-item">
                  <span className="is-lightblue-text has-text-centered is-block is-fullwidth">
                    No related articles yet
                  </span>
                </div>
              }
            </section>
          )} */}
        </Page>
      </div>
    );
  }
}
