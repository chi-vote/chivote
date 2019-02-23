import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, List, Page } from 'Components/common';
import { ResultsTable } from 'Components/raceDetail/items';
import styles from './styles.module.scss';

class RaceList extends Component {
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
        <p>
          <strong>
            <a href={`../races/${race.id}/`}>
              {race.name} {race.cboeId}
            </a>
          </strong>
        </p>
        <ResultsTable cboeId={race.cboeId} />
      </li>
    ));

    const otherRaces = flattenRemains.map(race => (
      <li className='column is-4' key={race.id}>
        <p>
          <strong>
            <a href={`../races/${race.id}/`}>
              {race.name} {race.cboeId}
            </a>
          </strong>
        </p>
        <ResultsTable cboeId={race.cboeId} />
      </li>
    ));

    const activeLabel = (
      <FormattedMessage id={`common.link.results`} defaultMessage='Results' />
    );

    return (
      <div>
        <Page childClass='page--detail container'>
          <Breadcrumb activeLabel={activeLabel} />
          <h1 className='page-heading title is-3'>
            <FormattedMessage
              id='ResultsList.heading'
              defaultMessage='Results'
            />
          </h1>
          <List className='columns is-multiline'>{otherRaces}</List>
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
          <List className='columns is-multiline'>{wardButtons}</List>
        </Page>
      </div>
    );
  }
}

export default RaceList;
