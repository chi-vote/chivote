import React, { Component } from 'react';
import moment from 'moment-mini';
import * as resultsJson2 from './results.tmp.2.json';
import { DataContext } from './data-context';

class Updated extends Component {
  static contextType = DataContext;

  render() {
    let results = this.context;

    return (
      <>
        <p>Last updated: {moment(results.datetime).format('lll')}</p>
      </>
    );
  }
}

class App extends Component {
  render() {
    return (
      <>
        <DataContext.Provider value={resultsJson2.default}>
          <Updated />
        </DataContext.Provider>
        <Updated />
      </>
    );
  }
}

export default App;
