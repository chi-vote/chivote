import React from 'react'
import moment from 'moment-mini'

const ArticleItem = props => {
  const { fields } = props.data

  return (
    <div className="list-item article-item">
      <div className="article-item__meta is-flex flex-space-between mb-1">
        <div>
          <span className="is-lightblue-text">{moment(fields.date).format('MMM D, YYYY')}</span>
          <time className="is-hidden">{fields.date}</time>
        </div>
        <cite className="is-red-text has-text-right">{fields.source}</cite>
      </div>
      <a className="has-text-white" href={fields.link}>
        {fields.hed}
      </a>
    </div>
  )
}

export default ArticleItem
