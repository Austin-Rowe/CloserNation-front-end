import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SignedIn.css';

class SignedIn extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.checkSubStatus = this.checkSubStatus.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    logout(){
        window.alert('logout');
        this.props.dispatch({
            type: 'LOGOUT'
        });
    }

    checkSubStatus(){
        window.alert("checkSubStatus");
    }

    deleteAccount(){
        window.alert('delete account');
    }

    render() {
        const { props } = this;

        return ( 
            <div id="signed-in-container">
                <h1>Welcome back {props.userName}!</h1>
                <h2>Manage your account from this page.</h2>
                <button onClick={this.logout} className="signed-in-button logout" >Logout</button>
                <button onClick={this.checkSubStatus} className="signed-in-button check-subscription" >Subscription Status</button>
                <button onClick={this.deleteAccount} className="signed-in-button delete-account" >Delete Account</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    authToken: state.authToken,
    userName: state.userName
});
 
export default connect(mapStateToProps)(SignedIn);