import React from 'react';
import { DataContext } from './DataProvider';

export function withDataContext(Component) {
  return function WrapperComponent(props) {
    return (
      <DataContext.Consumer>
        {results => <Component {...props} context={results} />}
      </DataContext.Consumer>
    );
  };
}
