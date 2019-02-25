import React from 'react';

const Reporting = ({ precinctsReporting, precinctsTotal }) => (
  <p>
    {precinctsReporting} of {precinctsTotal} precincts reporting.
  </p>
);

export default Reporting;
