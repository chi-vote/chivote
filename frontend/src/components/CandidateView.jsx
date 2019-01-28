import React from 'react';

const WebsiteLink = props => (
  <a href={props.url} className="button is-rounded">
    Website
  </a>
);

const TwitterLink = props => (
  <a href={props.url} className="button is-rounded">
    <span className="icon">
      <i className="fab fa-twitter" />
    </span>
  </a>
);

const FacebookLink = props => (
  <a href={props.url} className="button is-rounded">
    <span className="icon">
      <i className="fab fa-facebook-f" />
    </span>
  </a>
);

const renderSocialIcon = obj => {
  switch (obj.type) {
    case 'website':
      return <WebsiteLink url={obj.url} />;
      break;
    case 'twitter':
      return <TwitterLink url={obj.url} />;
      break;
    case 'facebook':
      return <FacebookLink url={obj.url} />;
    default:
      break;
  }
};

const BrDataList = props => {
  const { label, br_key, renderItem, data } = props;
  const items = data[br_key];

  console.log(items);

  if (items.length > 0) {
    return (
      <div className="candidate-view__section mb-1">
        <label htmlFor="" className="label is-lightblue-text">
          {label}
        </label>
        <ul>{items.map(item => renderItem(item))}</ul>
      </div>
    );
  } else {
    return null;
  }
};

const renderEducation = (d, i) => (
  <li className="has-text-white is-futura" key={i}>{`${d.school} (${
    d.degree
  })`}</li>
);

const Education = props => (
  <BrDataList
    label={'Education'}
    br_key={'br_education'}
    renderItem={renderEducation}
    data={props.data}
  />
);

const renderExperience = (d, i) => (
  <li className="has-text-white is-futura" key={i}>{`${d.company} - ${
    d.position
  }`}</li>
);

const Experience = props => (
  <BrDataList
    label={'Experience'}
    br_key={'br_experience'}
    renderItem={renderExperience}
    data={props.data}
  />
);

const renderEndorsements = (d, i) => (
  <li className="has-text-white is-futura" key={i}>{`${d.name}`}</li>
);

const Endorsements = props => (
  <BrDataList
    label={'Endorsements'}
    br_key={'br_endorsements'}
    renderItem={renderEndorsements}
    data={props.data}
  />
);

const CandidateView = props => {
  return (
    <div className="candidate-view">
      <img
        className="candidate-view__headshot mb-1"
        src={props.data.br_photo_url}
        alt={`Headshot of ${props.data.full_name}`}
      />
      <div className="field is-grouped">
        {props.data.br_urls.map(item => (
          <div className="control">{renderSocialIcon(item)}</div>
        ))}
      </div>
      <h1 className="title is-size-3 has-text-white mb-1">
        {props.data.full_name}
      </h1>
      <Education {...props} />
      <Experience {...props} />
      <Endorsements {...props} />
    </div>
  );
};

export default CandidateView;
