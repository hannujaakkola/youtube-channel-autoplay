import { state, render } from './../main.js'

export function update(updateState) {
  mergeState(state, updateState)
  render()
}

function mergeState(obj, newObj) {
  for (var key in newObj) {
    if (newObj[key].constructor === Object) {
      obj[key] = mergeState(obj[key], newObj[key])
    } else {
      obj[key] = newObj[key]
    }
  }

  return obj
}
