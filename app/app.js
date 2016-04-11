import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './components/App.js!jsx'

export const state = {
  videos: [],
  reverseOrder: false,
  search: {
    value: '',
    error: false,
  }
}

export function render() {
  ReactDOM.render(<App state={state} />, document.getElementById('app'))
}

// hack that makes things work
// maybe try http://stackoverflow.com/questions/33897273/typescript-and-systemjs-circle-dependency/33905499
window.setTimeout(render, 0)
// render()
