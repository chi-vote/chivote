import React from 'react'
import '../assets/styles/Page.css'

const Page = (props) => {
  return (
    <div className="page">
      <h3 className="page-heading title is-3">{props.heading}</h3>
      {props.children}
    </div>
  )
}

export default Page