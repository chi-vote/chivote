import React, { Component } from 'react';
import Table from './Table';
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
          <Table {...this.state} appendBarKey='append-bar' />
        </Provider>
      </div>
    );
  }
}

export default ResultsFeed;
