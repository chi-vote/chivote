import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment-mini';

const Updated = props => {
  const { className, datetime, isLoading } = props;

  if (isLoading) {
    return (
      <div className={className}>
        <FormattedMessage
          id='Results.Updated.loading'
          defaultMessage='Checking for new results...'
        />
      </div>
    );
  } else {
    return (
      <div className={className}>
        <FormattedMessage
          id='Results.Updated.text'
          defaultMessage='Last updated: {datetime}'
          values={{ datetime: moment(datetime).format('lll') }}
        />
      </div>
    );
  }
};

export default Updated;
