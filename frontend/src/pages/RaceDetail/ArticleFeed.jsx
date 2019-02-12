import React from 'react';
import { FormattedMessage } from 'react-intl';
import ArticleItem from 'Components/ArticleItem';

const ArticleFeed = props => {
  const { articles, feed_url } = props;

  const articleItems = articles.map((item, idx) => (
    <div className='column is-4' key={idx}>
      <ArticleItem data={item} />
    </div>
  ));

  return (
    <section id='the-newsfeed'>
      <h2 className='is-hidden-tablet page-heading title is-4'>
        <FormattedMessage
          id='RaceDetail.ArticleFeed.heading'
          defaultMessage='Articles'
        />
      </h2>
      <p className='has-text-right help-text'>
        <a href={feed_url}>
          <span class='icon'>
            <i className='fa fa-rss-square' />
          </span>
          <FormattedMessage
            id='RaceDetail.ArticleFeed.rss'
            defaultMessage='Subscribe to RSS'
          />
        </a>
      </p>
      <div className='columns is-multiline'>
        {articleItems.length ? (
          articleItems
        ) : (
          <div className='column is-full'>
            <div className='list-item'>
              <span className='is-lightblue-text has-text-centered is-block is-fullwidth'>
                <FormattedMessage
                  id='RaceDetail.ArticleFeed.no-articles'
                  defaultMessage='No related articles yet'
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleFeed;
