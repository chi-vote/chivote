import React, { Component } from 'react';
import * as emptyResultsJson from './results.empty.json';
import { withDataContext } from './withDataContext';

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

function transformData(results, cboeId) {
  const transformed = {};

  let contest;

  if ('contests' in results) {
    contest = results.contests[cboeId];
  }

  if (contest) {
    transformed.precinctsReporting =
      contest.meta[results.contest_headers.indexOf('prs_rpt')];
    transformed.precinctsTotal =
      contest.meta[results.contest_headers.indexOf('prs_tot')];

    transformed.dataHeaders = results.cand_headers;
    transformed.dataClasses = results.cand_classes;
    transformed.data = contest.cands;
  }

  return transformed;
}

class DataProvider extends Component {
  constructor() {
    super();

    this.state = {
      results: emptyResultsJson,
      transformed: {}
    };
  }

  render() {
    const results = this.props.context;
    const { cboeId } = this.props;
    const transformed = transformData(results, cboeId);

    const ThisContext = React.createContext({ ...results, ...transformed });

    const children = this.props.children;

    return (
      <ThisContext.Provider value={{ ...results, ...transformed }}>
        {recursiveMap(children, child => {
          if (typeof child.type == `function`) {
            return (
              <ThisContext.Consumer>
                {value => React.cloneElement(child, { ...value })}
              </ThisContext.Consumer>
            );
          } else {
            return child;
          }
        })}
      </ThisContext.Provider>
    );
  }
}

export default withDataContext(DataProvider);
