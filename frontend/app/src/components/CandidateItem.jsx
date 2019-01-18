import React from 'react'
import '../assets/styles/Candidate.css'

const CandidateItem = (props) => {
  return (
    <div className="candidate-item">
      <img src={props.photo} alt="" className="candidate-item__img"/>
      <p className="is-size-5 candidate-item__name">{props.name.toLowerCase()}</p>
    </div>
  )
}

export default CandidateItem