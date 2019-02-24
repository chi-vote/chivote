import React, { Component } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

class ResultsFeed extends Component {
  render() {
    const { dataHeaders, dataClasses, data } = this.props;

    return (
      <table className={cn('table', styles.table)}>
        <thead>
          <tr>
            {dataHeaders.map((d, i) => (
              <th key={i} className={dataClasses[i]}>
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {row.map((d, i) => (
                <td key={i} className={dataClasses[i]}>
                  {d}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ResultsFeed;
