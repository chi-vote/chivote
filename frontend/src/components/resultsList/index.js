import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, List, Page } from 'Components/common';
import * as Results from 'Components/results';
import cn from 'classnames';
import styles from './styles.module.scss';

const ResultsItem = race => {
  let link = `../races/${race.id}/`;

  if (typeof window !== `undefined`) {
    const currPath = window.location.pathname;

    link = `${currPath}races/${race.id}`.replace('results/', '');
  }

  return (
    <li
      className={cn('column is-half-tablet is-4-desktop', styles.resultsItem)}
      id={`result-${race.id}`}
    >
      <h3 className={cn('is-size-5', styles.raceName)}>
        <a href={link}>{race.name}</a>
      </h3>
      <Results.LocalProvider cboeId={race.cboeId}>
        <Results.Reporting />
        <Results.Table />
      </Results.LocalProvider>
    </li>
  );
};

class ResultsList extends Component {
  constructor() {
    super();

    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect() {
    var dropdown = this.dropdown;
    var element = document.getElementById(dropdown.value);

    var headerOffset = document
      .getElementsByClassName(styles.banner)[0]
      .getBoundingClientRect().height;
    headerOffset = 0;
    var elementTop = element.getBoundingClientRect().top;
    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
    var offsetTop = windowTop + elementTop - headerOffset;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    const currPath = window.location.pathname;

    let url = currPath.split('#')[0];
    url += '#' + dropdown.value;

    window.history.pushState({}, null, url);

    // element.querySelector('a').focus();

    window.clearTimeout(this.resetDropdownTimeoutHandle);

    this.resetDropdownTimeoutHandle = setTimeout(function() {
      dropdown.value = '';
    }, 3000);

    return;
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
      value: 'result-' + race.id,
      label: race.name
    }));

    const otherRaces = flattenRemains.map(race => (
      <ResultsItem {...race} key={race.id} />
    ));

    const citywideOptions = flattenRemains.map(race => ({
      value: 'result-' + race.id,
      label: race.name
    }));

    const SelectRace = ({ options }) => (
      <select
        onChange={this._onSelect}
        ref={node => (this.dropdown = node)}
        defaultValue=''
        required
      >
        <FormattedMessage
          id='ResultsList.select.message'
          defaultMessage='Jump to a race'
        >
          {placeholder => (
            <option value='' disabled>
              {placeholder}
            </option>
          )}
        </FormattedMessage>
        {options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    );

    return (
      <Results.DataProvider>
        <Page childClass='page--detail container'>
          <Breadcrumb rootPath='/2019-feb-26/' />
          <h1 className='page-heading title is-3'>
            <FormattedMessage
              id='ResultsList.heading'
              defaultMessage='Live Chicago election results'
            />
          </h1>

          <Results.LocalProvider>
            <Results.About />
            <div className={styles.banner}>
              <Results.Updated className={cn(styles.control, styles.updated)} />
              <div
                className={cn('select control', styles.select, styles.control)}
              >
                <SelectRace options={citywideOptions.concat(wardOptions)} />
              </div>
            </div>
          </Results.LocalProvider>

          <List className='columns is-multiline'>{otherRaces}</List>
          <h2 className='page-heading title is-4 mt-1'>
            <FormattedMessage
              id='RaceList.aldermanic.heading'
              defaultMessage='Aldermanic'
            />
          </h2>
          <List className='columns is-multiline'>{wardRaces}</List>
        </Page>
      </Results.DataProvider>
    );
  }
}

export default ResultsList;
