import React from 'react'
import '../assets/styles/Candidate.css'

const CandidateItem = (props) => {
  const { data } = props
  // console.log(data);

  return (
    <dd
      className="candidate-item"
      onClick={() => props.handleClick(props.data)}>
      <img src={data.br_thumb_url} alt="" className="candidate-item__img"/>
      <div className="candidate-item__meta">
        <span className="is-size-5 candidate-item__name">
          {`${data.full_name}`}
        </span>
        {
          props.data.incumbent &&
          <span className="has-text-white is-size-7 incumbent-tag">
            <span className="icon">
              <i className="fa fa-crown is-red-text"></i>
            </span>
            Incumbent
          </span>
        }
      </div>
    </dd>
  )
}

export default CandidateItem
