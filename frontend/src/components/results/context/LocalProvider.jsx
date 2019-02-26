import React, { Component } from 'react';
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

class LocalProvider extends Component {
  render() {
    const results = this.props.context;
    const { cboeId } = this.props;
    const transformed = transformData(results, cboeId);

    const LocalContext = React.createContext({ ...results, ...transformed });

    const children = this.props.children;

    return (
      <LocalContext.Provider value={{ ...results, ...transformed }}>
        {recursiveMap(children, child => {
          if (typeof child.type == `function`) {
            return (
              <LocalContext.Consumer>
                {data => React.cloneElement(child, { ...data })}
              </LocalContext.Consumer>
            );
          } else {
            return child;
          }
        })}
      </LocalContext.Provider>
    );
  }
}

export default withDataContext(LocalProvider);
