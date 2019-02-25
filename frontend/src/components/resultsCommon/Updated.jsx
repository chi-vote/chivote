import React, { Component } from 'react';
import moment from 'moment-mini';
import * as resultsJson from './results.tmp.json';
import * as resultsJson2 from './results.tmp.2.json';

const DataContext = React.createContext(resultsJson2.default);

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
        <DataContext.Provider value={resultsJson.default}>
          <Updated />
        </DataContext.Provider>
        <Updated />
      </>
    );
  }
}

export default App;
