import React from 'react';
import decode from 'decode-html';

const BrDataList = props => {
  const { label, renderItem, sortItems, sortOrder, data } = props;
  let items = data;

  if (sortItems) {
    items = _.orderBy(data, sortItems, sortOrder);
  }

  return (
    <div className="candidate-view__section mb-1">
      <label htmlFor="" className="label is-lightblue-text">
        {label}
      </label>
      {items.length > 0 ? (
        <ul className="bio-items">{items.map(item => renderItem(item))}</ul>
      ) : (
        <p className="has-text-grey-light">None available*</p>
      )}
    </div>
  );
};

const educationKeys = [
  'High School Diploma',
  "Associate's",
  "Bachelor's",
  'MBA',
  "Master's",
  'J.D.',
  'Ph.D.'
];

const sortEducation = d => -_.indexOf(educationKeys, d.degree);

const renderEducation = (d, i) => {
  let itemString = [d.degree, d.school, d.major].filter(Boolean).join(', ');
  itemString += d.grad_year ? ` (${d.grad_year})` : '';
  return (
    <li className="bio-item has-text-white is-futura" key={i}>
      {decode(itemString)}
    </li>
  );
};

const Education = props => (
  <BrDataList
    label={'Education'}
    renderItem={renderEducation}
    sortItems={sortEducation}
    data={props.data.br_education}
  />
);

const renderExperience = (d, i) => {
  let itemString = [d.company, d.position].filter(Boolean).join(', ');
  itemString += d.start_year
    ? ` (${d.start_year} – ${d.end_year ? d.end_year : ''})`
    : '';
  return (
    <li className="bio-item has-text-white is-futura" key={i}>
      {decode(itemString)}
    </li>
  );
};

const Experience = props => (
  <BrDataList
    label={'Experience'}
    renderItem={renderExperience}
    sortItems={[d => d.start_year || '', d => d.end_year || '']}
    sortOrder={['desc', 'desc']}
    data={props.data.br_experience}
  />
);

const renderEndorsements = (d, i) => (
  <li className="bio-item has-text-white is-futura" key={i}>{`${d.name}`}</li>
);

const Endorsements = props => (
  <BrDataList
    label={'Endorsements'}
    renderItem={renderEndorsements}
    data={props.data.br_endorsements}
  />
);

export { Education, Experience, Endorsements };
