import React from 'react'
import '../assets/styles/Candidate.css'

const CandidateItem = (props) => {
  return (
    <dd className="candidate-item">
      <img src={props.photo} alt="" className="candidate-item__img"/>
      <span className="is-size-5 candidate-item__name">{props.name.toLowerCase()}</span>
    </dd>
  )
}

export default CandidateItem