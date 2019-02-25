import React, { Component } from 'react';
import * as emptyResultsJson from './results.empty.json';

function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }

    return fn(child);
  });
}

class DataProvider extends Component {
  constructor() {
    super();

    this.state = {
      results: emptyResultsJson
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData() {
    let url = 'http://chi.vote.app.stage.s3.amazonaws.com/results.json';

    fetch(url)
      .then(res => res.json())
      .then(results => {
        this.setState({ results });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    let { results } = this.state;

    const { cboeId } = this.props;

    let contest;

    if ('contests' in results) {
      contest = results.contests[cboeId];
    }

    if (contest) {
      results.precinctsReporting =
        contest.meta[results.contest_headers.indexOf('prs_rpt')];
      results.precinctsTotal =
        contest.meta[results.contest_headers.indexOf('prs_tot')];

      results.dataHeaders = results.cand_headers;
      results.dataClasses = results.cand_classes;
      results.data = contest.cands;
    }

    const DataContext = React.createContext(results);

    const children = this.props.children;

    return (
      <DataContext.Provider value={results}>
        {recursiveMap(children, child => {
          if (typeof child.type == `function`) {
            return (
              <DataContext.Consumer>
                {value => React.cloneElement(child, { ...value })}
              </DataContext.Consumer>
            );
          } else {
            return child;
          }
        })}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
