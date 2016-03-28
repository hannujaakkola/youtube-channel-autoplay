import React from 'react'
import ReactDOM from 'react-dom'

import { Help } from './components/Help.js!jsx'
import { VideoList } from './components/VideoList.js!jsx'
import { SearchBox } from './components/SearchBox.js!jsx'

const App = props => (
  <div>
    <Help />
    <div className="container">
      <SearchBox />
      <VideoList />
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
