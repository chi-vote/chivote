import React, { Component } from 'react';
import cn from 'classnames';
import { select } from 'd3-selection';
import styles from './styles.module.scss';

class ResultsFeed extends Component {
  constructor(props) {
    super(props);

    this.initBars = this.initBars.bind(this);
    this.drawBars = this.drawBars.bind(this);

    const canAppend =
      props.dataClasses.findIndex(classStr =>
        classStr.includes(props.appendBarKey)
      ) > -1;

    this.state = {
      canDraw: this.props.drawBars && canAppend,
      canInit: true,
      isInit: false
    };
  }

  componentDidMount() {
    const { canDraw, canInit } = this.state;

    if (canDraw && canInit) {
      this.initBars();
    }
  }

  componentDidUpdate() {
    const { canDraw, canInit } = this.state;

    if (canDraw && canInit) {
      this.initBars();
    }

    if (canDraw) {
      this.drawBars();
    }
  }

  initBars() {
    const { appendBarKey } = this.props;
    const node = this.node;

    select(node)
      .select('thead')
      .selectAll('tr')
      // insert(type, before)
      .insert('th', function() {
        // insert before the nextSibling of the first 'append-bar' col
        return this.getElementsByClassName(appendBarKey)[0].nextSibling;
      })
      .classed(styles.barContainer, true);

    select(node)
      .select('tbody')
      .selectAll('tr')
      // insert(type, before)
      .insert('td', function() {
        // insert before the nextSibling of the first 'append-bar' col
        return this.getElementsByClassName(appendBarKey)[0].nextSibling;
      })
      .classed(styles.barContainer, true)
      .html(`<span class="${styles.barValue}"></span>`);

    this.setState({ canInit: false });
  }

  drawBars() {
    const { appendBarKey } = this.props;
    const node = this.node;

    const dataIdx = this.props.dataClasses.findIndex(classStr =>
      classStr.includes(appendBarKey)
    );
    const data = this.props.data.map(d => parseFloat(d[dataIdx]));
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
