import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, Page, PageHeading } from 'Components/common';
import styles from './styles.module.scss';

const WardButton = props => (
  <a href={`./${props.data.id}/`} className={styles.wardButton}>
    {props.data.name.match(/\d+/)}
  </a>
);

let WardLookup;

class RaceList extends Component {
  constructor() {
    super();
    this.state = {
      showWardLookup: false
    };
  }

  componentDidMount() {
    // https://github.com/zeit/next.js/issues/219
    WardLookup = require('./WardLookup').default;
    this.setState({ showWardLookup: true });
  }

  render() {
    const parsedRaceData = JSON.parse(this.props.data.races);
    const copyRaceData = [...parsedRaceData];
    const extractWardData = [];

    for (let i = 0; i < parsedRaceData.length; i++) {
      const race = parsedRaceData[i];

      if (
        race.name.toLowerCase().indexOf('ward') > -1 ||
        race.name.toLowerCase().indexOf('distrito') > -1
      ) {
        extractWardData.push(race);
        copyRaceData[i] = null;
      }
    }

    const flattenRemains = copyRaceData.filter(x => (x ? true : false));

    const wardButtons = extractWardData.map(race => (
      <li className='column is-4' key={race.id}>
        <WardButton data={race} />
      </li>
    ));

    const otherRaces = flattenRemains.map(race => (
      <li className='column is-4' key={race.id}>
        <a href={`./${race.id}/`} className={styles.wardButton}>
          {race.name}
        </a>
      </li>
    ));

    return (
      <div>
        <Page childClass='container'>
          <Breadcrumb />

          <PageHeading id='RaceList.heading' title='Races' asFormatted />

          <p className='is-lsb'>
            <FormattedMessage
              id='RaceList.text.1'
              defaultMessage='Choose a specific race to get more information and view candidates.'
            />
          </p>
          <ul className='columns'>{otherRaces}</ul>
          <h2 className='page-heading title is-4 mt-1'>
            <FormattedMessage
              id='RaceList.aldermanic.heading'
              defaultMessage='Aldermanic'
            />
          </h2>
          <p className='is-lsb'>
            <FormattedMessage
              id='RaceList.aldermanic.text.1'
              defaultMessage='Choose a specific ward number to get more information and view candidates.'
            />
          </p>
          {this.state.showWardLookup ? <WardLookup /> : null}
          <ul className='columns is-mobile is-multiline'>{wardButtons}</ul>
        </Page>
      </div>
    );
  }
}

export default RaceList;
