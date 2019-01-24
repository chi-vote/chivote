import React from 'react'
import List from '../components/List'

const RaceList = (props) => {
  console.log(JSON.parse(props.data.races));

  const races = JSON.parse(props.data.races)
  return (
    <List>
      {
        races.map(race => {
          return (
            <li className="list-item">
              <a href={`${race.id}`}>{race.name}</a>
            </li>
        )})
      }
    </List>
  )
}

export default RaceList
