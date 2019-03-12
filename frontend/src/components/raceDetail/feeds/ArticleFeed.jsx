import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ArticleItem } from '../items';
import Masonry from 'react-masonry-component';

const ArticleFeed = props => {
  const { articles } = props;

  const noArticles = articles.length === 0;

  const pinnedArticleItems = articles
    .filter(a => a.is_pinned)
    .map((item, idx) => (
      <div className='grid-item' key={idx}>
        <ArticleItem data={item} />
      </div>
    ));

  const articleItems = articles
    .filter(a => !a.is_pinned)
    .map((item, idx) => (
      <div className='grid-item' key={idx}>
        <ArticleItem data={item} />
      </div>
    ));

  return (
    <>
      <h2 className='is-hidden-tablet page-heading title is-4'>
        <FormattedMessage
          id='RaceDetail.ArticleFeed.heading'
          defaultMessage='Articles'
        />
        <a
          href='rss.xml'
          className='is-hidden-tablet'
          style={{ marginLeft: '1rem' }}
        >
          <span className='icon'>
            <i className='fa fa-rss-square' />
          </span>
        </a>
      </h2>
      <p className='has-text-right help-text is-hidden-mobile'>
        <a href='rss.xml'>
          <span className='icon'>
            <i className='fa fa-rss-square' />
          </span>
          <FormattedMessage
            id='RaceDetail.ArticleFeed.rss'
            defaultMessage='Subscribe to RSS'
          />
        </a>
      </p>
      {pinnedArticleItems.length > 0 && (
        <>
          <h3 className='has-text-yellow'>
            <i className='fas fa-star' /> Featured reading
          </h3>
          {/* <div className='columns is-multiline'>{pinnedArticleItems}</div> */}
          <Masonry
            className='columns is-multiline'
            options={{
              columnWidth: '.grid-sizer',
              itemSelector: '.grid-item',
              percentPosition: true
            }}
          >
            <div className='grid-sizer' />
            {pinnedArticleItems}
          </Masonry>
        </>
      )}
      {articleItems.length > 0 && (
        <>
          {pinnedArticleItems.length > 0 && <h3>More articles</h3>}
          {/* <div className='columns is-multiline'>{articleItems}</div> */}
          <Masonry
            className='columns is-multiline'
            options={{
              columnWidth: '.grid-sizer',
              itemSelector: '.grid-item',
              percentPosition: true
            }}
          >
            <div className='grid-sizer' />
            {articleItems}
          </Masonry>
        </>
      )}
      {noArticles && (
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
    </>
  );
};

export default ArticleFeed;
