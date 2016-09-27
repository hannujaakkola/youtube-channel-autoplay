import { state, update } from './../index.js'

export function updateSearch(value) {
  update({
    search: {
      value: value
    }
  })
}

export function toggleError(value) {
  update({
    search: {
      error: value
    }
  })
}

export function changeOrder(value) {
  update({
    reverseOrder: !state.reverseOrder
  })
}
