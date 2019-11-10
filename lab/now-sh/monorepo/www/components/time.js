import React from 'react'
import 'isomorphic-unfetch'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now: props.now
    }
  }

  componentDidMount() {
    const { path } = this.props
    const url = `${location.href}api/${path}`

    const update = async () => {
      try {
        const res = await fetch(url)
        if (res.ok) {
          const now = (await res.text()).trim()
          if (now !== this.state.now) {
            this.setState({now})
          }
        } else {
          console.log(`res not ok from ${url}`)
        }
      } catch (err) {
        console.error(`Could not fetch time from ${url}`)
      }
      this.timeout = setTimeout(update, 1000)
    }

    this.timeout = setTimeout(update, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render () {
    const { name } = this.props
    const { now } = this.state
    return (
      <div className="clock">
        The current time,<br/> according to <span>{name}</span>, is: <time key={now}>{now}</time>
      </div>
    ) 
  }
}
