import { API_KEY } from './config.js'
import _ from 'lodash'
import moment from 'moment'

import { state } from './main.js'
import { updateVideos, clearVideos } from './actions/video.js'
import { updateSearch, toggleError } from './actions/search.js'

const body = document.getElementsByTagName('body')[0]
const player = new YT.Player('player', {
  height: '100%',
  width: '100%',
  events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
  }
})

let playingVideo, playlistItemUrl, nextPageToken
let watchedVideos = []
if (localStorage.watchedVideos) {
  watchedVideos = JSON.parse(localStorage.watchedVideos)
}

function getPlaylist(url, pageToken) {
  if (pageToken) {
    url += `&pageToken=${pageToken}`
  }

  fetch(url).then(response => {
    response.json().then(data => {
      nextPageToken = data.nextPageToken

      updateVideos(state.videos
        .concat(data.items.map(video => {
          video.watched = _.includes(watchedVideos, video.snippet.resourceId.videoId)
          video.publishedAgo = moment(video.snippet.publishedAt).fromNow()
          return video
        }))
      )
    })
  })
}

export function getUploads(username) {
  clearVideos()

  var url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${username}&key=${API_KEY}`
  fetch(url).then(response => {
    response.json().then(data => {
      if (!data.items || !data.items.length) {
        toggleError(true)
        return
      }

      toggleError(false)

      var playlistId = data.items[0].contentDetails.relatedPlaylists.uploads
      playlistItemUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`

      getPlaylist(playlistItemUrl)
    })
  })
}

export function loadMoreVideos() {
  getPlaylist(playlistItemUrl, nextPageToken);
}

function onPlayerReady(event) {
  var username = document.location.search.split('?')[1]
  if (username) {
    updateSearch(username)
    getUploads(username)
  }
}

function onPlayerStateChange(event) {
  if(event.data === 0) {
    let position = playingVideo.snippet.position

    watchedVideos.push(playingVideo.snippet.resourceId.videoId)
    localStorage.watchedVideos = JSON.stringify(watchedVideos)

    state.videos[position].watched = true
    updateVideos(state.videos)

    if (!state.reverseOrder && position > 0) {
      playVideo(state.videos[position-1])
    } else if (state.reverseOrder && position < state.videos.length - 1) {
      playVideo(state.videos[position+1])
    } else {
      exitFullscreen()
    }
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen()
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

export function playVideo(video) {
  window.scroll(0,0)
  body.className = 'videoPlaying'

  playingVideo = video
  player.loadVideoById(video.snippet.resourceId.videoId, 0, 'large')
}

export function changePlayingOrder(order) {
  state.reverseOrder = order
}
