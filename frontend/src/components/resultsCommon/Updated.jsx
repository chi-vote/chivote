import React from 'react';
import moment from 'moment-mini';
import { DataContext } from './data-context';

const Updated = () => (
  <DataContext.Consumer>
    {({ datetime }) => <p>Last updated: {moment(datetime).format('lll')}</p>}
  </DataContext.Consumer>
);

export default Updated;
