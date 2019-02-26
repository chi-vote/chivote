import React, { Component } from 'react';
import * as Results from 'Components/results';
import styles from './ResultsFeed.module.scss';
import AppProvider from 'Components/results/appProvider';

class ResultsFeed extends Component {
  render() {
    return (
      <div className='contest'>
        <AppProvider>
          <Results.DataProvider cboeId={this.props.cboeId}>
            <Results.About />
            <div className={styles.info}>
              <Results.Updated />
              <Results.Reporting />
            </div>
            <Results.Table appendBarKey='append-bar' drawBars={true} />
          </Results.DataProvider>
        </AppProvider>
      </div>
    );
  }
}

export default ResultsFeed;
