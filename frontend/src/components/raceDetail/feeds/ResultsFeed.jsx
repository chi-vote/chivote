import React, { Component } from 'react';
import * as Results from 'Components/results';
import styles from './ResultsFeed.module.scss';

class ResultsFeed extends Component {
  render() {
    return (
      <Results.DataProvider>
        <Results.LocalProvider cboeId={this.props.cboeId}>
          <Results.About />
          <div className={styles.info}>
            <Results.Updated />
            <Results.Reporting />
          </div>
          <Results.Table appendBarKey='append-bar' drawBars={true} />
        </Results.LocalProvider>
      </Results.DataProvider>
    );
  }
}

export default ResultsFeed;
