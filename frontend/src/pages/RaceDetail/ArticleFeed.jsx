import React from 'react';
import ArticleItem from 'Components/ArticleItem';

const ArticleFeed = props => {
  const { articles, feed_url } = props;

  const articleItems = articles.map((item, idx) => (
    <div className="column is-4" key={idx}>
      <ArticleItem data={item} />
    </div>
  ));

  return (
    <section id="the-newsfeed">
      <h2 className="is-hidden-tablet page-heading title is-4">Articles</h2>
      <p className="has-text-right help-text">
        <a href={feed_url}>
          <span class="icon">
            <i className="fa fa-rss-square" />
          </span>
          Subscribe to RSS
        </a>
      </p>
      <div className="columns is-multiline">
        {articleItems.length ? (
          articleItems
        ) : (
          <div className="column is-full">
            <div className="list-item">
              <span className="is-lightblue-text has-text-centered is-block is-fullwidth">
                No related articles yet
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleFeed;
