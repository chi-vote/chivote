import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as Results from 'Components/results';
import styles from './ResultsFeed.module.scss';

class ResultsFeed extends Component {
  render() {
    return (
      <Results.DataProvider>
        <h2 className='is-hidden-tablet page-heading title is-4'>
          <FormattedMessage
            id='RaceDetail.ResultsFeed.heading'
            defaultMessage='Results'
          />
        </h2>
        <Results.LocalProvider cboeId={this.props.cboeId}>
          <Results.About />
          <div className={styles.info}>
            <Results.Updated />
            <Results.Reporting />
          </div>
          {/* <Results.Key /> */}
          <Results.Table appendBarKey='append-bar' drawBars={true} />
          <p className='has-text-right'>
            <a
              href={
                this.props.intl.locale == 'es'
                  ? '/es/2019-feb-26/results'
                  : '/2019-feb-26/results'
              }
            >
              See all results →
            </a>
          </p>
        </Results.LocalProvider>
      </Results.DataProvider>
    );
  }
}

export default injectIntl(ResultsFeed);
