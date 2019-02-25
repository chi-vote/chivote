import React, { Component } from 'react';
import { ResultsAboutText } from 'Components/resultsCommon';
import * as Results from 'Components/resultsCommon';

class ResultsFeed extends Component {
  render() {
    return (
      <div className='contest'>
        <Results.DataProvider cboeId={this.props.cboeId}>
          <ResultsAboutText />
          <Results.Reporting />
          <Results.Table appendBarKey='append-bar' drawBars={true} />
        </Results.DataProvider>
      </div>
    );
  }
}

export default ResultsFeed;
