import React from 'react'
import "./card.css"

const Card = ({card}) => {
  return (
    <div className="card">{card.title}</div>
  )
}

export default Card