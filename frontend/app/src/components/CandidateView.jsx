import React from "react";

const CandidateView = props => {
  return (
    <div className="candidate-view">
      <img src={props.data.br_photo_url} alt={`Headshot of ${props.data.full_name}`} />

    </div>
  )
}

export default CandidateView;
