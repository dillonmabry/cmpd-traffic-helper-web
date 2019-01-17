import React, { Component } from 'react';
import './app.css';
import Main from './components/Main';
import NavMenu from './components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faCarCrash } from '@fortawesome/free-solid-svg-icons'
library.add([faSearch, faCarCrash])

export default class App extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <Main />
      </div>
    )
  }
}
