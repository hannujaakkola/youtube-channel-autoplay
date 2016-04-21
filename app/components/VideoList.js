import React from 'react'

import Video from './Video.js!jsx'
import { playVideo, loadMoreVideos } from './../player.js'

function play() {
  playVideo(this)
}

const VideoList = props => (
  <div className="videoList">
    <ul>
      {props.videos.map(video => {
        var onClick = play.bind(video)
        return <Video
                 key={video.id}
                 position={video.snippet.position}
                 title={video.snippet.title}
                 publishedAgo={video.publishedAgo}
                 thumbnail={video.snippet.thumbnails.medium.url}
                 watched={video.watched}
                 onClick={onClick}
               />
      })}
      {props.videos.length >= 50 ?
        <li className="loadMoreContainer text-center">
          <button onClick={loadMoreVideos}>Load more</button>
        </li>
      : ''}
    </ul>
  </div>
)

export default VideoList
