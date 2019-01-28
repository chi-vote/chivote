import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import Homepage from 'Pages/Homepage';
import RaceDetail from 'Pages/RaceDetail';
import RaceList from 'Pages/RaceList';
// import CandidateDetail from 'Pages/CandidateDetail';
import ContentItemDetail from 'Pages/ContentItemDetail';

import 'Assets/styles/theme.scss';

/**
 * Maintain a simple map of React components to make it easier for
 * Django to reference individual components.
 */

const pages = {
  RaceDetail,
  RaceList,
  // CandidateDetail,
  ContentItemDetail,
  Homepage
};

class App extends Component {
  constructor(props) {
    super(props);
    this.page = pages[props.component];
  }
  render() {
    return React.createElement(this.page, this.props);
  }
}

export default hot(App);
