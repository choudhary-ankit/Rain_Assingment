import React, { Component } from 'react'
import NavApp from './Component/NavApp/NavApp';
import HomePage from './Component/HomePage/HomePage'

export default class App extends Component {
  render() {
    return (
      <div>
          {/* <NavApp/> */}
          <HomePage/>
      </div>
    )
  }
}
