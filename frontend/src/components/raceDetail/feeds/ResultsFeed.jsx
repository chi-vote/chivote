import React, { Component } from 'react';
import { ResultsTable } from '../items';

class ResultsFeed extends Component {
  render() {
    return <ResultsTable {...this.props} />;
  }
}

export default ResultsFeed;
