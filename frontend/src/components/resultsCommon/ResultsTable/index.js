import React, { Component } from 'react';
import cn from 'classnames';
import { select } from 'd3-selection';
import styles from './styles.module.scss';

class ResultsFeed extends Component {
  constructor() {
    super();

    this.initBars = this.initBars.bind(this);
    this.drawBars = this.drawBars.bind(this);
  }

  componentDidMount() {
    if (this.props.drawBars) {
      this.initBars();
      this.drawBars();
    }
  }

  componentDidUpdate() {
    if (this.props.drawBars) {
      this.drawBars();
    }
  }

  initBars() {
    const node = this.node;

    select(node)
      .select('thead')
      .selectAll('tr')
      .append('th')
      .classed(styles.barContainer, true);

    select(node)
      .select('tbody')
      .selectAll('tr')
      .append('td')
      .classed(styles.barContainer, true)
      .html(`<span class="${styles.barValue}"></span>`);
  }

  drawBars() {
    const node = this.node;
    const data = this.props.data.map(d => d[1]);
    const dataMax = Math.max(...data);

    select(node)
      .selectAll(`.${styles.barValue}`)
      .data(data)
      .style('width', d => `${(d / dataMax) * 100}%`)
      .html('&nbsp;');
  }

  render() {
    const { dataHeaders, dataClasses, data } = this.props;

    return (
      <table
        className={cn('table', styles.table)}
        ref={node => (this.node = node)}
      >
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
