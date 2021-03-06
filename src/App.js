import React, { Component } from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './Redux/store';


import Header from './Navigation/Header/Header';
import Footer from './Navigation/Footer/Footer';

import Stream from './Routes/StreamPage/Stream';
import SignupRevised from './Routes/Signup/SignupRevised';
import Archives from './Routes/Archives/Archives';
import WatchArchive from './Routes/Archives/WatchArchive';
import PasswordRecover from './Routes/Signup/PasswordRecover';
import AddArchive from './Routes/Archives/AddArchive';
import PasswordReset from './Routes/PasswordReset/PasswordReset';
import AdminView from './Routes/AdminView/Admin';
import Confirm from './Routes/ConfirmSubscription/Confirm';
import GiftSelection from './Routes/GiftRoutes/GiftSelect/GiftSelection';
import LinkPayout from './Routes/GiftRoutes/LinkPage/LinkPayout';
import GiftSignup from './Routes/GiftRoutes/GiftSignup/GiftSignup';

import AdminRevised from './Routes/AdminView/AdminRevised';

 
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route path="/(|ACCOUNT)/" component={SignupRevised} />
          <Route path="/STREAM" component={Stream} />
          <Route path="/ARCHIVES" component={Archives} />
          <Route path="/WATCH-ARCHIVE" component={WatchArchive} />
          <Route path="/PASSWORD-RECOVERY" component={PasswordRecover} />
          <Route path="/ADD-ARCHIVE" component={AddArchive} />
          <Route path="/ADMIN" component={AdminView} />
          <Route path="/RESET-PASSWORD/:resetPasswordAuthToken/:userName" component={PasswordReset} />
          <Route path="/CONFIRM-PAYPAL-SUBSCRIPTION/:paymentConfirmationToken" component={Confirm} />
          <Route path="/GIFT-SELECT" component={GiftSelection} />
          <Route path="/GIFT-LINK-PAYOUT/:monthCount/:token" component={LinkPayout} />
          <Route path="/GIFT-ACCOUNT-SIGNUP/:monthCount/:token" component={GiftSignup} />
          <Footer />
        </Router>
      </Provider>
    )
  }
}

export default App;
