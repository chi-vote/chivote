import React, { Component } from 'react';
import { DataContext } from './data-context';
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

    return (
      <DataContext.Provider value={results}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
