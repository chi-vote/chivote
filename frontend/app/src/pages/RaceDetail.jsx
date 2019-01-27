import React, { Component } from 'react';
import Interweave from 'interweave';
import Page from '../components/Page';
import List from '../components/List';
import { slide as SlideView } from 'react-burger-menu';
import CandidateView from '../components/CandidateView';
import CandidateItem from '../components/CandidateItem';
import ArticleItem from '../components/ArticleItem';
import StatementItem from '../components/StatementItem';

export default class RaceDetail extends Component {
  state = {
    feed: 'candidates',
    candidateDict: {},
    currentCandidate: null,
    slideViewActive: false
  };

  componentDidMount() {
    const dict = {}
    const candidates = JSON.parse(this.props.candidates);
    for (let i = 0; i < candidates.length; i++) {
      const element = candidates[i];
      dict[element.pk] = element.fields.full_name
    }

    this.setState({ candidateDict: dict })
    this.groupStatements()
  }

  setCandidateView = (candidateObj) => {
    console.log('hit setCandidateView');

    this.setState({
      slideViewActive: true,
      currentCandidate: candidateObj
    })
  }

  unsetCandidateView = (state) => {
    // console.log(state);
    this.setState({
      slideViewActive: state.isOpen
    })
  }

  groupStatements = () => {
    const groups = JSON.parse(this.props.data.statements).reduce((acc, curr) => {
      if(!acc.hasOwnProperty(curr.pk)) {
        acc[curr.pk] = []
      }
      acc[curr.pk].push(curr.fields)

      return acc
    }, {})

    return groups
  }

  renderFeed = () => {
    const articles = JSON.parse(this.props.data.articles)
      .filter(item => {
        return item.fields.race.indexOf(JSON.parse(this.props.data.office).id) > -1;
      })
      .map(item => <ArticleItem data={item} />);

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
      )
    } else if (this.state.feed === 'articles') {
      return (
        <section id="the-newsfeed">
          <h2 className="page-heading title is-4">Articles</h2>
          {
            articles.length ? articles :
            <div className="list-item">
              <span className="is-lightblue-text has-text-centered is-block is-fullwidth">
                No related articles yet
              </span>
            </div>
          }
        </section>
      )
    } else if (this.state.feed === 'statements') {
      const feed = []
      for (let issue in this.groupStatements()) {
        feed.push(
          <div>
            <h3 className="has-text-white title is-5">{`On ${this.props.data.issueDict[issue]}...`}</h3>
            {
              this.groupStatements()[issue].map(item => (
                <StatementItem
                  data={item}
                  speaker={this.state.candidateDict[item.candidate]}/>
              ))
            }
          </div>
        )
      }
      return (
        <section id="the-statements">
          <h2 className="page-heading title is-4">Statements</h2>
          {feed}
        </section>
      )
    }
  }

  render() {
    const { data, candidates } = this.props;
    const parsedData = JSON.parse(data.statements);
    console.log(parsedData);

    return (
      <div className="container">
        <SlideView
          left
          width={320}
          isOpen={this.state.slideViewActive}
          onStateChange={this.unsetCandidateView}
          customBurgerIcon={false}
          customCrossIcon={false}>
          {
            this.state.currentCandidate &&
            <CandidateView
              data={this.state.currentCandidate}/>
          }
        </SlideView>
        <Page
          className="page page--detail page--inner"
          heading={`Race for ${JSON.parse(data.office).office}`}
        >
          <p>
            <Interweave content={data.description} />
          </p>
          <div className={`field is-grouped is-${this.state.feed}-active mb-1`}>
            <div className="control is-expanded">
              <button
                className="button is-rounded is-large is-candidates"
                onClick={() => this.setState({ feed: 'candidates' })}
              >
                {/* Candidates */}
                <span className="icon">
                  <i className="fa fa-lg fa-user-tie"></i>
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
                  <i className="fa fa-lg fa-newspaper"></i>
                </span>
              </button>
            </div>
            <div className="control is-expanded">
              <button
                className="button is-rounded is-large is-statements"
                onClick={() => this.setState({ feed: 'statements' })}
              >
                {/* Statements */}
                <span className="icon">
                  <i className="fa fa-lg fa-comment-dots"></i>
                </span>
              </button>
            </div>
          </div>
          {
            this.renderFeed()
          }
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
