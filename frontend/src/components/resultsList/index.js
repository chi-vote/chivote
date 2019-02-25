import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, List, Page } from 'Components/common';
import * as Results from 'Components/results';

const ResultsItem = race => (
  <li className='column is-4' id={`race--${race.id}`}>
    <h3 className='is-size-5'>
      <a href={`../races/${race.id}/`}>{race.name}</a>
    </h3>
    <Results.DataProvider cboeId={race.cboeId}>
      <Results.Reporting />
      <Results.Table />
    </Results.DataProvider>
  </li>
);

class ResultsList extends Component {
  constructor() {
    super();

    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect() {
    var e = document.getElementById(this.dropdown.value);
    e.scrollIntoView({ behavior: 'smooth' });
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
    const wardRaces = extractWardData.map(race => (
      <ResultsItem {...race} key={race.id} />
    ));

    const wardOptions = extractWardData.map(race => ({
      value: 'race--' + race.id,
      label: race.name
    }));

    const otherRaces = flattenRemains.map(race => (
      <ResultsItem {...race} key={race.id} />
    ));

    const citywideOptions = flattenRemains.map(race => ({
      value: 'race--' + race.id,
      label: race.name
    }));

    const activeLabel = (
      <FormattedMessage id={`common.link.results`} defaultMessage='Results' />
    );

    const SelectRace = () => (
      <select onChange={this._onSelect} ref={node => (this.dropdown = node)}>
        {citywideOptions.concat(wardOptions).map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
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

          <Results.DataProvider>
            <Results.About />
            <Results.Updated />
            <SelectRace />
          </Results.DataProvider>

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
