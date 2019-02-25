import React, { Component } from 'react';
import * as Results from 'Components/results';

class ResultsFeed extends Component {
  render() {
    return (
      <div className='contest'>
        <Results.DataProvider cboeId={this.props.cboeId}>
          <Results.About />
          <Results.Reporting />
          <Results.Table appendBarKey='append-bar' drawBars={true} />
        </Results.DataProvider>
      </div>
    );
  }
}

export default ResultsFeed;
