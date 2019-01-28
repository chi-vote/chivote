import React from "react";

const WebsiteLink = props => (
  <a href={props.url} className="button is-rounded">
    Website
  </a>
)

const TwitterLink = props => (
  <a href={props.url} className="button is-rounded">
    <span className="icon">
      <i className="fab fa-twitter"></i>
    </span>
  </a>
)

const FacebookLink = props => (
  <a href={props.url} className="button is-rounded">
    <span className="icon">
      <i className="fab fa-facebook-f"></i>
    </span>
  </a>
)

const renderSocialIcon = (obj) => {
  switch (obj.type) {
    case 'website':
      return <WebsiteLink url={obj.url} />
      break;
    case 'twitter':
      return <TwitterLink url={obj.url} />
      break;
    case 'facebook':
      return <FacebookLink url={obj.url} />
    default:
      break;
  }
}

const CandidateView = props => {
  return (
    <div className="candidate-view">
      <img
        className="candidate-view__headshot mb-1"
        src={props.data.br_photo_url}
        alt={`Headshot of ${props.data.full_name}`} />
      <div className="field is-grouped">
        {
          props.data.br_urls.map(item => (
            <div className="control">
              {renderSocialIcon(item)}
            </div>
          ))
        }
      </div>
      <h1 className="title is-size-3 has-text-white mb-1">{props.data.full_name}</h1>
      <div className="candidate-view__section mb-1">
        <label htmlFor="" className="label is-lightblue-text">Education</label>
        <ul>
          {
            props.data.br_education.map(item => {
              return (
                <li className="has-text-white is-futura">{`${item.school} (${item.degree})`}</li>
              )
            })
          }
        </ul>
      </div>
      <div className="candidate-view__section mb-1">
        <label htmlFor="" className="label is-lightblue-text">Experience</label>
        <ul>
          {
            props.data.br_experience.map(item => {
              return (
                <li className="has-text-white is-futura">{`${item.company} - ${item.position}`}</li>
              )
            })
          }
        </ul>
      </div>
      {
        props.data.br_endorsements.length &&
        <div className="candidate-view__section mb-1">
          <label htmlFor="" className="label is-lightblue-text">Endorsements</label>
          <ul>
            {
              props.data.br_endorsements.map(item => {
                return (
                  <li className="has-text-white is-futura">{`${item.name}`}</li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default CandidateView;
