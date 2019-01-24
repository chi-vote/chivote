import React, { Component } from 'react'
import Page from '../components/Page'
import List from '../components/List'

const RaceList = (props) => {
  const parsedRaceData = JSON.parse(props.data.races)
  const copyRaceData = [...parsedRaceData]
  const extractWardData = []

  console.log(parsedRaceData.length)

  for (let i = 0; i < parsedRaceData.length; i++) {
    const race = parsedRaceData[i];

    if(race.name.toLowerCase().indexOf("ward") > -1) {
      extractWardData.push(race)
      copyRaceData[i] = null
    }
  }

  const flattenRemains = copyRaceData.filter(x => {
    return x ? true : false
  })

  console.log(flattenRemains)

  const wardButtons = extractWardData.map(data => (
    <li className="column is-4">
      <WardButton key={data.id} data={data} />
    </li>
  ))

  const otherRaces = flattenRemains.map(data => (
    <li className="column">
      <a key={data.id} href={`${data.id}`} className="ward-button">
        {data.name}
      </a>
    </li>
  ))

  const races = JSON.parse(props.data.races)
  return (
    <div className="container">
      <Page
        className="page page--detail"
        heading="Races">
        <p>
          Choose a specific race to get more information and view candidates.
        </p>
        <List className="columns">
          {otherRaces}
        </List>
        <h2 className="page-heading title is-4">Aldermanic</h2>
        <p>
          Choose the number of your ward
        </p>
        <List className="columns is-mobile is-multiline">
        {
          // races.map(race => {
          //   return (
          //     <li className="list-item">
          //       <a href={`${race.id}`}>{race.name}</a>
          //     </li>
          // )})
          wardButtons
        }
      </List>
      </Page>
    </div>
  )
}

const WardButton = props => (
  <a href={`${props.data.id}`} className="ward-button">
    {props.data.name.match(/\d+/)}
  </a>
)

export default RaceList
