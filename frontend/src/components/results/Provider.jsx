import React, { Component } from 'react';
import * as resultsJson from './results.tmp.json';

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
  render() {
    let results = resultsJson.default;

    const { cboeId } = this.props;
    const contest = results.contests[cboeId];

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
