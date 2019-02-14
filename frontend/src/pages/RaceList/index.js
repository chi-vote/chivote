import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Page from 'Components/Page';
import { Breadcrumb } from 'Components/Breadcrumb';
import List from 'Components/List';
import WardLookup from 'Components/WardLookup';
import './style.scss';

class RaceList extends Component {
  renderBreadcrumb() {
    const currPath = window.location.pathname;
    const parentUrl = curr =>
      curr.substr(0, curr.lastIndexOf('/', curr.length - 2)) + '/';

    const breadcrumbLinks = [
      {
        url: parentUrl(currPath),
        content: (
          <FormattedMessage id='common.link.home' defaultMessage='Home' />
        )
      },
      {
        url: currPath,
        content: (
          <FormattedMessage
            id='common.link.all-races'
            defaultMessage='All races'
          />
        )
      }
    ];

    return <Breadcrumb items={breadcrumbLinks} />;
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

    return (
      <div>
        <Page childClass='page--detail container'>
          {this.renderBreadcrumb()}
          <h1 className='page-heading title is-3'>
            <FormattedMessage id='RaceList.heading' defaultMessage='Races' />
          </h1>
          <p className='is-lsb'>
            <FormattedMessage
              id='RaceList.text.1'
              defaultMessage='Choose a specific race to get more information and view candidates.'
            />
          </p>
          <List className='columns'>{otherRaces}</List>
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
          <WardLookup />
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
