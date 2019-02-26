import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment-mini';

const Updated = ({ className, datetime }) => (
  <div className={className}>
    <FormattedMessage
      id='Results.Updated.text'
      defaultMessage='Last updated: {datetime}'
      values={{ datetime: moment(datetime).format('lll') }}
    />
  </div>
);

export default Updated;
