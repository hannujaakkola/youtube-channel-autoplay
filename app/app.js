import React from 'react'
import ReactDOM from 'react-dom'

import { VideoList } from './components/VideoList.js!jsx'
import { SearchBox } from './components/SearchBox.js!jsx'

const App = props => (
  <div className="container">
    <SearchBox />
    <VideoList />
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
