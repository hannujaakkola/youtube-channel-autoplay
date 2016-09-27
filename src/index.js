import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import App from './components/App.js'

export const state = {}

update({
  videos: [],
  reverseOrder: false,
  search: {
    value: '',
    error: false,
  }
})

export function update(newState) {
  _.merge(state, newState)
  ReactDOM.render(
    <App state={state} />,
    document.getElementById('root')
  )
}
