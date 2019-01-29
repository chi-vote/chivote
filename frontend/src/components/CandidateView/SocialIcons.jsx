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
    case 'twitter':
      return <TwitterLink url={obj.url} />;
    case 'facebook':
      return <FacebookLink url={obj.url} />;
    default:
      break;
  }
};

const SocialIcons = props => (
  <div className="field is-grouped is-grouped-multiline">
    {props.data.br_urls.map(item => (
      <div className="control">{renderSocialIcon(item)}</div>
    ))}
  </div>
);

export { SocialIcons };