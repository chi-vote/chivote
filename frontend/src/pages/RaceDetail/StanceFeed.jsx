import React from 'react';
import { FormattedMessage } from 'react-intl';
import decode from 'decode-html';
import Parser from 'html-react-parser';
import ReadMoreReact from 'Components/ReadMoreReact';
import StanceItem from 'Components/StanceItem';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { slugify } from './utils';

const StanceFeed = props => {
  const feed = [];
  const { stances, issues, candidates } = props;

  let groupedStances = _(stances)
    .groupBy(x => x.fields.issue)
    .map((value, key) => ({ issue: key, stances: value }))
    .value();

  groupedStances = _.orderBy(groupedStances, x => {
    var issueObj = _.find(issues, i => i.pk == x.issue);
    return issueObj.fields.issue_order;
  });

  for (const group of Object.values(groupedStances)) {
    const { issue, stances } = group;
    const issueObject = _.find(issues, i => {
      return i.pk == issue;
    });

    feed.push(
      <div
        className='issue issue__group'
        id={`issue--${slugify(issueObject.fields.name)}`}
        key={slugify(issueObject.fields.name)}
      >
        <h3 className='has-text-white title is-5 issue__heading'>{`On ${
          issueObject.fields.name
        }...`}</h3>

        <ReadMoreReact
          text={Parser(
            decode(issueObject.fields.description).replace(/<(?:.|\n)*?>/gm, '')
          )}
          min={100}
          ideal={150}
          max={200}
          className='issue__description'
        />

        <div className='columns is-multiline'>
          {stances.map(item => (
            <div className='column is-4'>
              <StanceItem
                data={item.fields}
                key={item.pk}
                candidate={
                  _.find(candidates, c => {
                    return c.pk == item.fields.candidate;
                  }).fields
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const menu = Object.values(groupedStances).map(x => {
    const issueObject = _.find(issues, i => {
      return i.pk == x.issue;
    });
    const issueLabel = issueObject.fields.name;

    return (
      <a className='button' href={`#issue--${slugify(issueLabel)}`}>
        {issueLabel}
      </a>
    );
  });

  const issue_labels = (
    <div className='issues-menu'>
      <ScrollMenu
        data={menu}
        arrowLeft={<span className='menu-arrow'>←</span>}
        arrowRight={<span className='menu-arrow'>→</span>}
      />
    </div>
  );

  return (
    <section id='the-stances'>
      <h2 className='is-hidden-tablet page-heading title is-4'>
        <FormattedMessage
          id='RaceDetail.StancesFeed.heading'
          defaultMessage='Stances'
        />
      </h2>
      {issue_labels}
      {feed}
    </section>
  );
};

export default StanceFeed;
