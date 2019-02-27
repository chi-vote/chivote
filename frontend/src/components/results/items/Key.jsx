import React, { Component } from 'react';
import styles from './Key.module.scss';

const hasIncumbent = props => {
  const { dataHeaders, data } = props;
  const idx = (dataHeaders || []).indexOf('name');
  let hasIncumbent = false;

  if (idx > -1 && data) {
    const names = data.map(x => x[idx]);
    const regex = /\*$/;
    hasIncumbent = names.map(n => regex.test(n)).reduce((x, y) => x || y);
  }

  return hasIncumbent;
};

class Key extends Component {
  constructor() {
    super();

    this.hasIncumbent = this.hasIncumbent.bind(this);
  }

  hasIncumbent() {
    const { dataHeaders, data } = this.props;
    const idx = (dataHeaders || []).indexOf('name');
    let hasIncumbent = false;

    if (idx > -1 && data) {
      const names = data.map(x => x[idx]);
      const regex = /\*$/;
      hasIncumbent = names.map(n => regex.test(n)).reduce((x, y) => x || y);
    }

    return hasIncumbent;
  }

  render() {
    const Incumbent = () => (
      <div>
        <span style={{ verticalAlign: 'sub' }}>* </span>
        <span>Incumbent</span>
      </div>
    );

    return (
      <div className={styles.key}>{this.hasIncumbent() && <Incumbent />}</div>
    );
  }
}

export default Key;
