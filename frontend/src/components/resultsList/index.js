import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Breadcrumb,
  Page,
  PageHeading,
  PageHeadingFormatted
} from 'Components/common';
import * as Results from 'Components/results';
import cn from 'classnames';
import styles from './styles.module.scss';

const ResultsItem = race => {
  let link = `../races/${race.id}/`;

  if (typeof window !== `undefined`) {
    const currPath = window.location.pathname;

    link = `${currPath}races/${race.id}`.replace('results/', '');
  }

  console.log(race);

  return (
    <li
      className={cn(
        'column is-half-tablet is-one-third-widescreen',
        styles.resultsItem
      )}
      id={`result-${race.id}`}
    >
      <h3 className='is-size-5'>
        <a href={link}>{race.name}</a>
      </h3>
      <span className={styles.raceStatus}>{race.status}</span>
      <Results.LocalProvider cboeId={race.cboeId}>
        <Results.Reporting />
        <Results.Table />
      </Results.LocalProvider>
    </li>
  );
};

class ResultsList extends Component {
  _updateUrlId = newId => {
    const currPath = window.location.pathname;

    let url = currPath.split('#')[0];
    url += '#' + newId;

    window.history.pushState({}, null, url);

    return;
  };

  _onSelect = () => {
    var { dropdown } = this;
    var element = document.getElementById(dropdown.value);

    var elementTop = element.getBoundingClientRect().top;
    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
    var offsetTop = windowTop + elementTop;

    // do stuff
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    window.clearTimeout(this.resetDropdownTimeout);

    this.resetDropdownTimeout = setTimeout(function() {
      dropdown.value = '';
    }, 3000);

    this._updateUrlId(dropdown.value);

    return;
  };

  render() {
    const races = JSON.parse(this.props.data.races);
    const isWardRace = d => !!d.name.match(/(ward|distrito)/gi);
    const wardRaces = races.filter(d => isWardRace(d));
    const otherRaces = races.filter(d => !isWardRace(d));

    const ResultsItems = ({ races }) => (
      <ul className='columns is-multiline'>
        {races.map((race, idx) => (
          <ResultsItem {...race} key={idx} />
        ))}
      </ul>
    );

    const selectOptions = otherRaces.concat(wardRaces).map(race => ({
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
        <Page>
          <Breadcrumb />

          <PageHeading
            id='ResultsList.heading'
            title='Live Chicago election results'
            asFormatted
          />

          <Results.LocalProvider>
            <Results.About />
            <div className={styles.banner}>
              <Results.Updated className={cn(styles.control, styles.updated)} />
              <div
                className={cn('select control', styles.select, styles.control)}
              >
                <SelectRace options={selectOptions} />
              </div>
            </div>
          </Results.LocalProvider>
          <ResultsItems races={otherRaces} />
          <h2 className='has-text-primary title is-4'>
            <FormattedMessage
              id='RaceList.aldermanic.heading'
              defaultMessage='Aldermanic'
            />
          </h2>
          <ResultsItems races={wardRaces} />
        </Page>
      </Results.DataProvider>
    );
  }
}

export default ResultsList;
