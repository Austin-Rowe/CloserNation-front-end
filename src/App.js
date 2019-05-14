import React, { Component } from 'react';

import Header from './Navigation/Header/Header';
import Stream from '../src/Routes/StreamPage/Stream';
 
class App extends Component {
  render () {
    return <React.Fragment>
      <Header />
      <Stream />
    </React.Fragment>
  }
}

export default App;
