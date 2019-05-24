import React, { Component } from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './Redux/store';


import Header from './Navigation/Header/Header';
import Stream from './Routes/StreamPage/Stream';
import Signup from './Routes/Signup/Signup';
import Archives from './Routes/Archives/Archives';
import WatchArchive from './Routes/Archives/WatchArchive';
 
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route path="/(|signup)/" component={Signup} />
          <Route path="/stream" component={Stream} />
          <Route path="/archives" component={Archives} />
          <Route path="/watch-archive" component={WatchArchive} />
        </Router>
      </Provider>
    )
  }
}

export default App;
