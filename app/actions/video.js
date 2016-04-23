import { update } from './update.js'

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
