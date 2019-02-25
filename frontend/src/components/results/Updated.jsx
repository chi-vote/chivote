import React from 'react';
import moment from 'moment-mini';

const Updated = ({ datetime }) => (
  <span>Last updated: {moment(datetime).format('lll')}</span>
);

export default Updated;
