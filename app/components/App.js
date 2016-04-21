import React from 'react'

import Help from './Help.js!jsx'
import VideoList from './VideoList.js!jsx'
import SearchBox from './SearchBox.js!jsx'

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
