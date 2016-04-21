import { update } from './../main.js'

export function updateVideos(videos) {
  update({
    videos: videos
  })
}

export function clearVideos() {
  update({
    videos: []
  })
}
