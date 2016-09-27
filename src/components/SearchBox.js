import React from 'react'
import { getUploads } from './../actions/player.js'
import { updateSearch, changeOrder } from './../actions/search.js'

const SearchBox = props => {
  function onChange(e) {
    updateSearch(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    getUploads(props.state.search.value)
    history.pushState({}, '', '?' + props.state.search.value)
  }

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <input type="text"
               value={props.state.search.value}
               onChange={onChange}
               placeholder="channel name"
        />
        <input type="submit" value="search" />
      </form>
      <p className="text-center">{props.state.search.error ? `Didn't find anything :(` : ''}</p>

      <p className="text-center pointer" onClick={changeOrder}>Playing videos from {props.state.reverseOrder ? 'newest to oldest ▼' : 'oldest to newest ▲'}</p>
    </div>
  )
}

export default SearchBox
