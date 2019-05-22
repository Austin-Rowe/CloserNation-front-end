import React, { Component } from 'react';

import './SignedIn.css';

const SignedIn = (props) => {
    return ( 
        <div id="signed-in-container">
            <h1>Thanks for signing in! Manage your account from this page.</h1>
            <button className="signed-in-button logout" >Logout</button>
            <button className="signed-in-button check-subscription" >Subscription Status</button>
            <button className="signed-in-button delete-account" >Delete Account</button>
        </div>
    );
}

export default SignedIn;