import React from 'react'
import { getUploads } from './../player.js'

export class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.change = this.change.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  change(e) {
    this.setState({value: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
    getUploads(this.state.value)
    history.pushState({}, '', '?' + this.state.value)
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.value} onChange={this.change} />
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
}
