import _ from 'lodash'
import moment from 'moment'
import { updateVideos, clearVideos } from './components/VideoList.js!jsx'

const playerContainer = document.getElementById('playerContainer')
const player = new YT.Player('player', {
  height: '480',
  width: '854',
  events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
  }
})

let videos, playingVideo
let watchedVideos = []
if (localStorage.watchedVideos) {
  watchedVideos = JSON.parse(localStorage.watchedVideos)
}

function getPlaylist(url, nextPageToken) {
  if (nextPageToken) {
    url += `&pageToken=${nextPageToken}`
  }

  fetch(url).then(response => {
    response.json().then(data => {
      videos = videos.concat(data.items).map(video => {
        video.watched = _.includes(watchedVideos, video.snippet.resourceId.videoId)
        video.publishedAgo = moment(video.snippet.publishedAt).fromNow()
        return video
      })

      updateVideos(videos)
    })
  })
}

export function getUploads(username) {
  videos = []
  clearVideos()

  var url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${username}&key=${API_KEY}`
  fetch(url).then(response => {
    response.json().then(data => {
      if (!data.items.length) {
        return;
      }

      var playlistId = data.items[0].contentDetails.relatedPlaylists.uploads
      var playlistItemUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`

      getPlaylist(playlistItemUrl)
    })
  })
}

function onPlayerReady(event) {
  var username = document.location.search.split('?')[1]
  if (username) {
    getUploads(username)
  }
}

function onPlayerStateChange(event) {
  if(event.data === 0) {
    let position = playingVideo.snippet.position

    watchedVideos.push(playingVideo.snippet.resourceId.videoId)
    localStorage.watchedVideos = JSON.stringify(watchedVideos)

    videos[position].watched = true
    updateVideos(videos)

    if(position > 0) {
      playVideo(videos[position-1])
    }
  }
}

export function playVideo(video) {
  playerContainer.className = 'visible'
  playingVideo = video
  player.loadVideoById(video.snippet.resourceId.videoId, 0, 'large')
}

let videoPosition
