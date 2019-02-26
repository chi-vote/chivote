import React, { Component } from "react";

// Create a new context for the data
export const DataContext = React.createContext();

// Create a provider Component
class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData() {
    let url = "https://chi.vote.app.stage.s3.amazonaws.com/results.json";

    fetch(url)
      .then(res => res.json())
      .then(results => {
        this.setState({ results });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <DataContext.Provider value={{ ...this.state.results }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
