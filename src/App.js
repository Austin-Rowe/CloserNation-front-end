import React, { Component } from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './Redux/store';


import Header from './Navigation/Header/Header';
import Footer from './Navigation/Footer/Footer';

import Stream from './Routes/StreamPage/Stream';
import Signup from './Routes/Signup/Signup';
import Archives from './Routes/Archives/Archives';
import WatchArchive from './Routes/Archives/WatchArchive';
import PasswordRecover from './Routes/Signup/PasswordRecover';

 
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route path="/(|ACCOUNT)/" component={Signup} />
          <Route path="/STREAM" component={Stream} />
          <Route path="/ARCHIVES" component={Archives} />
          <Route path="/WATCH-ARCHIVE" component={WatchArchive} />
          <Route path="/PASSWORD-RECOVERY" component={PasswordRecover} />
          <Footer />
        </Router>
      </Provider>
    )
  }
}

export default App;
