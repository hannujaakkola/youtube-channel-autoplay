import React from 'react'

import Help from './Help.js!jsx'
import VideoList from './VideoList.js!jsx'
import SearchBox from './SearchBox.js!jsx'


export const App = props => (
  <div>
    <Help />
    <div className="container">
      <SearchBox />
      <VideoList videos={props.state.videos} />
    </div>
  </div>
)
