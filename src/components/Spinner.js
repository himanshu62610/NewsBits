import React, { Component } from 'react'
import loading from './iphone.gif'
export default class spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading}alt="loading"/>
      </div>
    )
  }
}
  
