import React from 'react'
import '../assets/styles/Candidate.css'

const CandidateItem = (props) => {
  const { data } = props
  console.log(data);

  return (
    <dd className="candidate-item">
      <img src={data.br_thumb_url} alt="" className="candidate-item__img"/>
      <span className="is-size-5 candidate-item__name">
        {`${data.full_name}`}
      </span>
    </dd>
  )
}

export default CandidateItem
