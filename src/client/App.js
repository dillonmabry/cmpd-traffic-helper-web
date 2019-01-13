import React, { Component } from 'react';
import './app.css';
import Main from './components/Main';

export default class App extends Component {
  //state = { accidents: null };

  // componentDidMount() {
  //   fetch('/api/accidents')
  //     .then(res => res.json())
  //     .then(data => this.setState({ accidents: data.accidents }));
  // }

  // render() {
  //   const { accidents } = this.state;
  //   return (
  //     <div>
  //       {accidents ? <h1>Test</h1> : <h1>Loading.. please wait!</h1>}
  //     </div>
  //   );
  // }
  render() {
    return <Main />
  }
}
