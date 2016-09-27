import React from 'react'

import Help from './Help.js'
import VideoList from './VideoList.js'
import SearchBox from './SearchBox.js'

const App = props => (
  <div>
    <Help />
    <div className="container">
      <SearchBox state={props.state} />
      <VideoList videos={props.state.videos} />
    </div>
  </div>
)

export default App
