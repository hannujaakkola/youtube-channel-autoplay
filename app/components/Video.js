import React from 'react'

const Video = props => (
  <li onClick={props.onClick} className={props.watched ? 'watched' : ''}>
    <img src={props.thumbnail} alt={props.title} />
    <div className="info">
      <span className="title">{props.title}</span>
      <span className="date">{props.publishedAgo}</span>
    </div>
  </li>
)

export default Video
