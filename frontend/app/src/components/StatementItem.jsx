import React from 'react'
import moment from 'moment-mini'
import Interweave from 'interweave';

const StatementItem = props => {
  // const { fields } = props.data

  return (
    <div className="list-item article-item">
      <span className="is-lightblue-text is-lbs is-size-4">{props.speaker}</span>
      <a className="has-text-white" href={props.data.link}>
        <blockquote
          className="has-text-white is-futura mb-1">
          <Interweave content={props.data.statement_long}/>
        </blockquote>
      </a>
      <cite className="is-red-text has-text-right">{props.data.source}</cite>
    </div>
  )
}

export default StatementItem
