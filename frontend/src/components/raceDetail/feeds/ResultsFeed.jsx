import React, { Component } from 'react';
import * as Results from 'Components/results';
import styles from './ResultsFeed.module.scss';

class ResultsFeed extends Component {
  render() {
    return (
      <div className='contest'>
        <Results.DataProvider cboeId={this.props.cboeId}>
          <Results.About />
          <div className={styles.info}>
            <Results.Updated />
            <Results.Reporting />
          </div>
          <Results.Table appendBarKey='append-bar' drawBars={true} />
        </Results.DataProvider>
      </div>
    );
  }
}

export default ResultsFeed;
