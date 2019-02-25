import React, { Component } from 'react';
import moment from 'moment-mini';
import * as resultsJson from './results.tmp.json';

class Updated extends Component {
  render() {
    let results = resultsJson.default;
    return <p>Last updated: {moment(results.datetime).format('lll')}</p>;
  }
}

export default Updated;
