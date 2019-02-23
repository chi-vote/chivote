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
    const precinctsReporting = this.props.precinctsReporting || 2557;
    const precinctsTotal = this.props.precinctsTotal || 2557;

    return (
      <div className='contest'>
        <p className='small'>
          {precinctsReporting} of {precinctsTotal} precincts reporting.
        </p>{' '}
        <p className='small'>{this.props.cboeId}</p>
        <table className={cn('table', styles.table)}>
          <thead>
            <tr>
              {dataHeaders.map(d => (
                <th>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr>
                {row.map(d => (
                  <td>{d}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ResultsFeed;
