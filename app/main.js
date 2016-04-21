import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.js!jsx'

export const state = {
  videos: [],
  reverseOrder: false,
  search: {
    value: '',
    error: false,
  }
}

export function update(updateState) {
  // this is quite simple, works only for 2 levels
  for (let key in updateState) {
    if (updateState[key] instanceof Object) {
      for (let subKey in updateState[key]) {
        state[key][subKey] = updateState[key][subKey]
      }
    } else {
      state[key] = updateState[key]
    }
  }

  render()
}

function render() {
  ReactDOM.render(<App state={state} />, document.getElementById('app'))
}

// all dependencies need to be loaded before initializing so here's a hack
window.setTimeout(render, 0)
