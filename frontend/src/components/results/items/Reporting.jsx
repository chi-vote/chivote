import React from 'react';
import { FormattedMessage } from 'react-intl';
import { numberWithCommas } from 'Components/utils';

const Reporting = ({ precinctsReporting, precinctsTotal, votesTotal }) => {
  return (
    <p>
      <FormattedMessage
        id='Results.Reporting.text'
        defaultMessage='{precinctsReporting} of {precinctsTotal} precincts reporting. Total votes: {votesTotal}'
        values={{
          precinctsReporting,
          precinctsTotal,
          votesTotal:
            typeof votesTotal == `number`
              ? numberWithCommas(votesTotal)
              : votesTotal
        }}
      />
    </p>
  );
};

export default Reporting;
