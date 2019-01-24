import React from 'react'
import '../assets/styles/Page.css'

const Page = (props) => {
  return (
    <section className="page">
      <h1 className="page-heading title is-3">{props.heading}</h1>
      {props.children}
    </section>
  )
}

export default Page