import React, { Component } from 'react';
import ResultsTable from './ResultsTable';
import Reporting from './Reporting';
import Provider from './Provider';
import * as resultsJson from './results.tmp.json';

class ResultsFeed extends Component {
  constructor(props) {
    super(props);

    const results = resultsJson.default;

    const contest = results.contests[props.cboeId];

    this.state = {
      dataHeaders: results.cand_headers,
      dataClasses: results.cand_classes,
      data: contest.cands,
      drawBars: props.drawBars
    };
  }

  render() {
    return (
      <div className='contest'>
        <Provider cboeId={this.props.cboeId}>
          <Reporting />
        </Provider>
        <ResultsTable {...this.state} appendBarKey='append-bar' />
      </div>
    );
  }
}

export default ResultsFeed;
