import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import electron from 'electron'

class App extends Component {
  render () {
    // Get screen displays
    const electronScreen = electron.screen
    // Get all connected monitors
    const displays = electronScreen.getAllDisplays()
    console.log(displays)
    // List the IDs
    const displayIDs = displays.map((element, key) => (
      <li key={key}>
        ID: {element.id}
        <br />
        Bounds: Width: {element.bounds.width} x Height: {element.bounds.height}
        <br />
        Rotation: {element.rotation}
        <br />
        ScaleFactor: {element.scaleFactor}
        <br />
        TouchSupport: {element.touchSupport}
        <br />
      </li>
    ))

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React/Electron</h1>
        </header>
        <p className='App-intro'>
          Hello Electron! There are currently {displays.length} screens
          connected to your PC.
        </p>
        <p>Screen IDs:</p>
        <ol>{displayIDs}</ol>
      </div>
    )
  }
}

export default App
