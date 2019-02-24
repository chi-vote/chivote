import React, { Component } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const _dummyDataHeaders = ['', 'Candidate', 'Percent'];

const _dummyData = [
  [<i className='fa fa-check' />, 'Mark R. Warner', '49.15%'],
  ['', 'Ed W. Gillespie', '48.34%'],
  ['', 'Robert C. Sarvis', '2.43%'],
  ['', 'Write-in', '0.08%']
];

class ResultsFeed extends Component {
  render() {
    const dataHeaders = this.props.dataHeaders || _dummyDataHeaders;
    const data = this.props.data || _dummyData;

    return (
      <table className={cn('table', styles.table)}>
        <thead>
          <tr>
            {dataHeaders.map((d, i) => (
              <th key={i}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {row.map((d, i) => (
                <td key={i}>{d}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ResultsFeed;
