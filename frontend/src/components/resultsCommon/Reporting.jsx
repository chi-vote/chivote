import React from 'react';
import { DataContext } from './data-context';

const Reporting = () => (
  <DataContext.Consumer>
    {({ precinctsReporting, precinctsTotal }) => (
      <p>
        {precinctsReporting} of {precinctsTotal} precincts reporting.
      </p>
    )}
  </DataContext.Consumer>
);

export default Reporting;
