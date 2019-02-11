import React, { Component } from 'react';
import Page from 'Components/Page';
import List from 'Components/List';
import WardLookup from 'Components/WardLookup';
import './style.scss';

class RaceList extends Component {
  state = {
    showLookup: true
  };

  render() {
    const parsedRaceData = JSON.parse(this.props.data.races);
    const copyRaceData = [...parsedRaceData];
    const extractWardData = [];

    for (let i = 0; i < parsedRaceData.length; i++) {
      const race = parsedRaceData[i];

      if (race.name.toLowerCase().indexOf('ward') > -1) {
        extractWardData.push(race);
        copyRaceData[i] = null;
      }
    }

    const flattenRemains = copyRaceData.filter(x => (x ? true : false));

    const wardButtons = extractWardData.map(data => (
      <li className='column is-4' key={data.id}>
        <WardButton data={data} />
      </li>
    ));

    const otherRaces = flattenRemains.map(data => (
      <li className='column' key={data.id}>
        <a href={`./${data.id}/`} className='ward-button'>
          {data.name}
        </a>
      </li>
    ));

    const races = JSON.parse(this.props.data.races);

    const breadcrumb = (function() {
      const currPath = window.location.pathname;
      const parentUrl = curr =>
        curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';

      return (
        <nav className='breadcrumb' aria-label='breadcrumbs'>
          <ul>
            <li>
              <a href={parentUrl(currPath)}>Home</a>
            </li>
            <li className='is-active'>
              <a href={currPath} aria-current='page'>
                All races
              </a>
            </li>
          </ul>
        </nav>
      );
    })();

    return (
      <div>
        <Page childClass='page--detail container'>
          {breadcrumb}
          <h1 className='page-heading title is-3'>{'Races'}</h1>
          <p className='is-lsb'>
            Choose a specific race to get more information and view candidates.
          </p>
          <List className='columns'>{otherRaces}</List>
          <h2 className='page-heading title is-4 mt-1'>Aldermanic</h2>
          <p className='is-lsb'>
            Choose a specific ward number to get more information and view
            candidates.
          </p>
          {!this.state.showLookup && (
            <button
              className='button is-rounded mb-1 is-fullwidth'
              onClick={() => this.setState({ showLookup: true })}
            >
              I don't know my ward
            </button>
          )}
          {this.state.showLookup && (
            // <div className="list-item">
            <WardLookup />
            // </div>
          )}
          <List className='columns is-mobile is-multiline'>{wardButtons}</List>
        </Page>
      </div>
    );
  }
}

const WardButton = props => (
  <a href={`./${props.data.id}/`} className='ward-button'>
    {props.data.name.match(/\d+/)}
  </a>
);

export default RaceList;
