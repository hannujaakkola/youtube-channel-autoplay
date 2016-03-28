import React from 'react'
import { getUploads } from './../player.js'

export let updateSearch
export let toggleError

export class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      error: false
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

  componentWillMount() {
    updateSearch = value => this.setState({value})
    toggleError = value => this.setState({error: value})
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.onSubmit}>
          <input type="text"
                 value={this.state.value}
                 onChange={this.change}
                 placeholder="channel name"
          />
          <input type="submit" value="search" />
        </form>
        <p className="text-center">{this.state.error ? `Didn't find anything :(` : ''}</p>
      </div>
    )
  }
}
