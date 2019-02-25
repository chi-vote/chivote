import React, { Component } from 'react';
import { DataContext } from './data-context';
import * as resultsJson from './results.tmp.json';

class DataProvider extends Component {
  render() {
    return (
      <DataContext.Provider value={resultsJson.default}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
