import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, Page, PageHeading } from 'Components/common';
import cn from 'classnames';
import styles from './styles.module.scss';

const RaceItems = ({ races, listClass }) => (
  <ul className={cn('columns is-multiline', listClass)}>
    {races.map(race => (
      <li className='column is-4' key={race.id}>
        <RaceButton {...race} key={race.id} />
      </li>
    ))}
  </ul>
);

const RaceButton = ({ name, id }) => {
  return (
    <a href={`./${id}/`} className={styles.button}>
      {/\d+/.test(name) ? name.match(/\d+/) : name}
    </a>
  );
};

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
    const races = JSON.parse(this.props.data.races);
    const isWardRace = d => !!d.name.match(/(ward|distrito)/gi);
    const wardRaces = races.filter(d => isWardRace(d));
    const otherRaces = races.filter(d => !isWardRace(d));

    return (
      <Page childClass='container'>
        <Breadcrumb />

        <PageHeading id='RaceList.heading' title='Races' asFormatted />

        <p className='is-lsb'>
          <FormattedMessage
            id='RaceList.text.1'
            defaultMessage='Choose a specific race to get more information and view candidates.'
          />
        </p>

        <RaceItems races={otherRaces.filter(d => !d.decided)} />

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

        <RaceItems
          races={wardRaces.filter(d => !d.decided)}
          listClass='is-mobile'
        />

        <h2 className='page-heading title is-4 mt-1'>
          <FormattedMessage
            id='RaceList.decided.heading'
            defaultMessage='Already decided'
          />
        </h2>

        <p className='is-lsb'>
          <FormattedMessage
            id='RaceList.decided.text.1'
            defaultMessage='These races are already decided, because the candidate with the most votes won more than 50 percent of the votes.'
          />
        </p>

        <RaceItems races={otherRaces.filter(d => d.decided)} />
        <br />
        <RaceItems
          races={wardRaces.filter(d => d.decided)}
          listClass='is-mobile'
        />
      </Page>
    );
  }
}

export default RaceList;
