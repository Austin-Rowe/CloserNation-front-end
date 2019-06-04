import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SignedIn.css';

class SignedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: '',
            password: ''
        }

        this.logout = this.logout.bind(this);
        this.checkSubStatus = this.checkSubStatus.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    logout(){
        this.props.dispatch({
            type: 'LOGOUT'
        });
    }

    checkSubStatus(){
        window.alert("checkSubStatus");
    }

    deleteAccount(){
        if(window.confirm("Are you sure you want to delete your account?")){
            fetch('http://localhost:3000/user', {
                method: 'delete',
                
                body: JSON.stringify({
                    identity: this.state.identity,
                    password: this.state.password
                }),
                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.authToken
                }
                
            }).then(res => {
                if(res.status !== 200){
                    window.alert("Something went wrong! Try again.");
                } 
                return res.json();
            })
            .then(body => {
                console.log(body);
                this.logout();
            })
            .catch(err => console.error('Error: ' + err));
        }
        
    }

    render() {
        const { props } = this;

        return ( 
            <div id="signed-in-container">
                <h1>Welcome back {props.userName}!</h1>
                <h2>Manage your account from this page.</h2>
                <button onClick={this.logout} className="signed-in-button logout" >Logout</button>
                <button onClick={this.checkSubStatus} className="signed-in-button check-subscription" >Subscription Status</button>
                <input className="delete-confirmation-input" id="identity" type="text" placeholder="Username or Password" value={this.state.identity} onChange={this.updateField} />
                <input className="delete-confirmation-input" id="password" type="password" placeholder="password" value={this.state.password} onChange={this.updateField} />
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