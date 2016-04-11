import { state, render } from './../app.js'

export function updateVideos(videos) {
  state.videos = videos
  render()
}

export function clearVideos() {
  state.videos = []
  render()
}
