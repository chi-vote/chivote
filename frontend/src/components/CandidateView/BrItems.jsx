import React from 'react';
import decode from 'decode-html';

const BrDataList = props => {
  const { label, renderItem, sortItems, sortOrder, data } = props;
  let items = data;

  if (sortItems) {
    items = _.orderBy(data, sortItems, sortOrder);
  }

  return (
    <div className="candidate-view__section">
      <label htmlFor="" className="label is-lightblue-text">
        {label}
      </label>
      {items.length > 0 ? (
        <ul className="bio-items">
          {items.map((item, i) => renderItem(item, i))}
        </ul>
      ) : (
        <p className="has-text-grey-light">None available*</p>
      )}
    </div>
  );
};

const educationKeys = [
  'High School Diploma',
  "Associate's",
  'BA',
  "Bachelor's",
  'MBA',
  'MA',
  "Master's",
  'JD',
  'J.D.',
  'Juris Doctor',
  'JD',
  'Ph.D.'
];

const sortEducation = d => -_.indexOf(educationKeys, d.degree);

const renderEducation = (d, i) => {
  let itemString = [d.degree, d.school, d.major]
    .filter(Boolean)
    .map(x => x.trim())
    .join(', ');
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
    sortItems={[d => d.grad_year, sortEducation]}
    sortOrder={['desc', 'asc']}
    data={props.education}
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
    data={props.experience}
  />
);

const renderEndorsements = (d, i) => (
  <li className="bio-item has-text-white is-futura" key={i}>{`${d.name}`}</li>
);

const Endorsements = props => (
  <BrDataList
    label={'Endorsements'}
    renderItem={renderEndorsements}
    data={props.endorsements}
  />
);

export { Education, Experience, Endorsements };
