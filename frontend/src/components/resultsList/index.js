import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, List, Page } from 'Components/common';
import { ResultsContainer } from 'Components/resultsCommon';
import styles from './styles.module.scss';

const ResultsItem = race => (
  <li className='column is-4' key={race.id}>
    <p className='has-text-weight-bold'>
      <a href={`../races/${race.id}/`}>{race.name}</a>
    </p>
    <ResultsContainer cboeId={race.cboeId} />
  </li>
);

class ResultsList extends Component {
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
    const wardRaces = extractWardData.map(race => <ResultsItem {...race} />);
    const otherRaces = flattenRemains.map(race => <ResultsItem {...race} />);

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
          <List className='columns is-multiline'>{wardRaces}</List>
        </Page>
      </div>
    );
  }
}

export default ResultsList;
