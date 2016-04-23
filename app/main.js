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

export function render() {
  ReactDOM.render(<App state={state} />, document.getElementById('app'))
}

// all dependencies need to be loaded before initializing so here's a hack
window.setTimeout(render, 0)
