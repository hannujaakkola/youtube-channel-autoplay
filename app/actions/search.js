import { state, render } from './../app.js'

export function updateSearch(value) {
  state.search.value = value
  render()
}

export function toggleError(value) {
  state.search.error = value
  render()
}

export function changeOrder(value) {
  state.reverseOrder = !state.reverseOrder
  render()
}
