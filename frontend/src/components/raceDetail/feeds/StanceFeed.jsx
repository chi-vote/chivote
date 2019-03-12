import React from 'react';
import { FormattedMessage } from 'react-intl';
import decode from 'decode-html';
import Parser from 'html-react-parser';
// import ScrollMenu from 'react-horizontal-scrolling-menu';
import { ReadMoreReact, slugify } from 'Components/utils';
import StanceItems from './StanceItems';

const _ = {
  find: require('lodash/fp/find'),
  flow: require('lodash/fp/flow'),
  groupBy: require('lodash/fp/groupBy'),
  map: require('lodash/fp/map').convert({ cap: false }),
  sortBy: require('lodash/fp/sortBy')
};

const StanceFeed = props => {
  const feed = [];
  const { stances, issues, candidates } = props;

  let groupedStances = _.flow(
    _.groupBy(x => x.fields.issue),
    _.map((val, key) => ({ issue: key, stances: val })),
    // _.orderBy()
    _.sortBy(x => {
      var issueObj = _.find(i => i.pk == x.issue)(issues);
      return issueObj.fields.issue_order;
    })
  )(stances);

  for (let group of Object.values(groupedStances)) {
    const { issue, stances } = group;
    const issueObject = _.find(i => i.pk == issue)(issues);

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

        <StanceItems stances={stances} candidates={candidates} />
      </div>
    );
  }

  const menu = Object.values(groupedStances).map(x => {
    const issueObject = _.find(i => i.pk == x.issue)(issues);
    const issueLabel = issueObject.fields.name;

    return (
      <a className='button' href={`#issue--${slugify(issueLabel)}`}>
        {issueLabel}
      </a>
    );
  });

  // const issue_labels = (
  //   <div className='issues-menu'>
  //     <ScrollMenu
  //       data={menu}
  //       arrowLeft={<span className='menu-arrow'>←</span>}
  //       arrowRight={<span className='menu-arrow'>→</span>}
  //     />
  //   </div>
  // );

  return (
    <>
      <h2 className='is-hidden-tablet page-heading title is-4'>
        <FormattedMessage
          id='RaceDetail.StancesFeed.heading'
          defaultMessage='Stances'
        />
      </h2>
      {/* {issue_labels} */}
      {feed}
    </>
  );
};

export default StanceFeed;
