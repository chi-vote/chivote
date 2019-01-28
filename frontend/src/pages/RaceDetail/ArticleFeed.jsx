import React from 'react';
import ArticleItem from 'Components/ArticleItem';

const ArticleFeed = props => {
  const { articles } = props;

  const articleItems = articles.map(item => (
    <div className="column is-4">
      <ArticleItem data={item} />
    </div>
  ));

  return (
    <section id="the-newsfeed">
      <h2 className="is-hidden-tablet page-heading title is-4">Articles</h2>
      <div className="columns is-multiline">
        {articleItems.length ? (
          articleItems
        ) : (
          <div className="list-item">
            <span className="is-lightblue-text has-text-centered is-block is-fullwidth">
              No related articles yet
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleFeed;
