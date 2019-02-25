import React from 'react';
import * as resultsJson from './results.tmp.json';

export const DataContext = React.createContext(resultsJson.default);
