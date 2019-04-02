import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

const Updated = props => {
  const { className, datetime, isLoading, isFinal } = props;
  const { locale } = props.intl;

  if (isFinal) {
    return (
      <div className={className}>
        <FormattedMessage
          id='Results.Updated.final'
          defaultMessage='Certified results: {datetime}'
          values={{
            datetime: moment(datetime)
              .locale(locale)
              .format('ll')
          }}
        />
      </div>
    );
  } else if (isLoading) {
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
          values={{
            datetime: datetime
              ? moment(datetime)
                  .locale(locale)
                  .format('lll')
              : 'N/A'
          }}
        />
      </div>
    );
  }
};

export default injectIntl(Updated);
