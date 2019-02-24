import React, { Component } from 'react';
import ResultsTable from './ResultsTable';
import * as resultsJson from './results.tmp.json';

const PrecinctsReportingText = ({ precinctsReporting, precinctsTotal }) => (
  <p className='small'>
    {precinctsReporting} of {precinctsTotal} precincts reporting.
  </p>
);

class ResultsFeed extends Component {
  constructor(props) {
    super(props);

    const results = resultsJson.default;

    const contest = results.contests[props.cboeId];
    const precinctsReporting =
      contest.meta[results.contest_headers.indexOf('# Completed precincts')];
    const precinctsTotal =
      contest.meta[results.contest_headers.indexOf('# of Eligible Precincts')];

    this.state = {
      dataHeaders: results.cand_headers,
      dataClasses: results.cand_classes,
      data: contest.cands,
      precinctsReporting,
      precinctsTotal,
      drawBars: props.drawBars
    };
  }

  render() {
    return (
      <div className='contest'>
        <PrecinctsReportingText {...this.state} />
        <ResultsTable {...this.state} appendBarKey='append-bar' />
      </div>
    );
  }
}

export default ResultsFeed;
