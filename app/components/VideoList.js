import React from 'react'
import Video from './Video.js!jsx'
import { playVideo } from './../player.js'

export let updateVideos
export let clearVideos

export class VideoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
  }

  componentWillMount() {
    updateVideos = videos => {
      this.setState({
        videos
      })
    }

    clearVideos = () => {
      this.state = {
        videos: []
      }
    }
  }

  click(video) {
    playVideo(video)
  }

  render() {
    return (
      <div className="videoList">
        <ul>
          {this.state.videos.map(video => {
            var boundClick = this.click.bind(this, video)
            return <Video
                     key={video.id}
                     position={video.snippet.position}
                     title={video.snippet.title}
                     publishedAgo={video.publishedAgo}
                     thumbnail={video.snippet.thumbnails.medium.url}
                     watched={video.watched}
                     onClick={boundClick}
                   />
          })}
        </ul>
      </div>
    )
  }
}
