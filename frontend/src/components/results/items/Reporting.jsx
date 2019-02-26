import React from 'react';
import { FormattedMessage } from 'react-intl';

const Reporting = ({ precinctsReporting, precinctsTotal }) => (
  <p>
    <FormattedMessage
      id='Results.Reporting.text'
      defaultMessage='{precinctsReporting} of {precinctsTotal} precincts reporting.'
      values={{ precinctsReporting, precinctsTotal }}
    />
  </p>
);

export default Reporting;
