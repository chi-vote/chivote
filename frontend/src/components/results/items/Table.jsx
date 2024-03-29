import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';
import { select } from 'd3-selection';
import { numberWithCommas, parseHtml } from 'Components/utils';
import styles from './Table.module.scss';

const _headers = {
  name: (
    <FormattedMessage
      id='Results.Table.header.candidate'
      defaultMessage='Candidate'
    />
  ),
  vote_cnt: (
    <FormattedMessage id='Results.Table.header.votes' defaultMessage='Votes' />
  ),
  vote_pct: (
    <FormattedMessage
      id='Results.Table.header.percent'
      defaultMessage='Percent'
    />
  )
};

const processData = (d, i) => {};

class Table extends Component {
  constructor(props) {
    super(props);

    this.canAppend = this.canAppend.bind(this);
    this.initBars = this.initBars.bind(this);
    this.drawBars = this.drawBars.bind(this);

    this.state = {
      canDraw: props.drawBars,
      canInit: true,
      isInit: false
    };

    this.results = this.props;
  }

  componentDidMount() {
    const { canDraw } = this.state;

    this.setState({ canDraw: canDraw && this.canAppend() });
  }

  canAppend() {
    const { appendBarKey } = this.props;
    const { dataClasses } = this.props;

    const canAppend =
      dataClasses.findIndex(classStr => classStr.includes(appendBarKey)) > -1;

    return canAppend;
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
      // .html(`<span class="${styles.barValue}"></span>`);
      .html(`<progress class="${cn('progress', styles.barValue)}"></progress>`);

    this.setState({ canInit: false });
  }

  drawBars() {
    const { appendBarKey } = this.props;
    const node = this.node;
    const results = this.props;

    const dataIdx = results.dataClasses.findIndex(classStr =>
      classStr.includes(appendBarKey)
    );
    const data = results.data.map(d => parseFloat(d[dataIdx]));
    const dataMax = data.reduce((x, y) => x + y);

    select(node)
      .selectAll(`.${styles.barValue}`)
      .data(data)
      .attr('value', d => d)
      .attr('max', dataMax);
  }

  processData(d, i) {
    const { dataHeaders } = this.props;

    if (typeof d == `number`) {
      return numberWithCommas(d);
    }

    if (dataHeaders[i] == 'name') {
      const name = d.replace(
        '*',
        ' <span class="tag is-white is-lsb"><abbr title="Incumbent" class="has-text-grey-dark">( I )</abbr></span>'
      );
      return parseHtml(name);
    }

    return d;
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
                {_headers[d]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {row.map((d, i) => (
                <td key={i} className={dataClasses[i]}>
                  {this.processData(d, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  dataHeaders: [],
  dataClasses: [],
  data: []
};

export default Table;
