import { state } from './../main.js'
import { update } from './update.js'

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
