import React, { Component } from 'react';

// Create a new context for the data
export const DataContext = React.createContext();

// Create a provider Component
class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      isLoading: false
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    try {
      // if local final results file exists, read from that
      var results = require('./results.json');

      if (results) {
        this.setState({ results, isLoading: false });
      }
    } catch (err) {
      // otherwise read from remote source
      this.fetchData();
      this.interval = setInterval(() => this.fetchData(), 30 * 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData() {
    this.setState({ isLoading: true });

    let url = 'https://chi.vote/results.json';

    fetch(url)
      .then(res => res.json())
      .then(results => {
        setTimeout(() => this.setState({ results, isLoading: false }), 1000);
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <DataContext.Provider
        value={{ ...this.state.results, isLoading: this.state.isLoading }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
