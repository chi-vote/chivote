import React from 'react';
import moment from 'moment-mini';

const Updated = ({ datetime }) => (
  <p>Last updated: {moment(datetime).format('lll')}</p>
);

export default Updated;
