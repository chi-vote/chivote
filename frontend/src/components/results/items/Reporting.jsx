import React from 'react';
import { FormattedMessage } from 'react-intl';

const Reporting = ({ precinctsReporting, precinctsTotal, votesTotal }) => (
  <p>
    <FormattedMessage
      id='Results.Reporting.text'
      defaultMessage='{precinctsReporting} of {precinctsTotal} precincts reporting. Total votes: {votesTotal}'
      values={{ precinctsReporting, precinctsTotal, votesTotal }}
    />
  </p>
);

export default Reporting;
