import React, { Component } from 'react';
import * as resultsJson from './results.tmp.json';

class DataProvider extends Component {
  render() {
    let results = resultsJson.default;

    const { cboeId } = this.props;
    const contest = results.contests[cboeId];

    if (contest) {
      results.precinctsReporting =
        contest.meta[results.contest_headers.indexOf('# Completed precincts')];
      results.precinctsTotal =
        contest.meta[
          results.contest_headers.indexOf('# of Eligible Precincts')
        ];

      results.dataHeaders = results.cand_headers;
      results.dataClasses = results.cand_classes;
      results.data = contest.cands;
    }

    const DataContext = React.createContext(results);

    const children = this.props.children;

    return (
      <DataContext.Provider value={results}>
        {React.Children.map(children, child => {
          return (
            <DataContext.Consumer>
              {value => React.cloneElement(child, { ...value })}
            </DataContext.Consumer>
          );
        })}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
