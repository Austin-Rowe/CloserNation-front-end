import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import './Signup.css';
import SignedIn from './SignedIn';

class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            signupEmail: '',
            signupUsername: '',
            signupPassword: '',
            signupPasswordConfirm: '',
            signupFirstName: '',
            signupLastName: '',
            signinUser: '',
            signinPassword: '',
        }

        console.log({
            loggedIn: props.loggedIn,
            authToken: props.authToken
        });

        this.updateField = this.updateField.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    login(e){
        if(e){
            e.preventDefault();
        }
        const {signinUser, signinPassword} = this.state;
        if(signinPassword === '' || signinUser === ''){
            window.alert("Password or Email is blank!");
        } else {
            fetch('https://api.bestclosershow.com/user/login', {
                method: 'post',
                
                body: JSON.stringify({
                    identity: signinUser,
                    password: signinPassword
                }),
              
                headers: {
                  'Content-Type': 'application/json'
                }
              
            }).then(res => {
                if(res.status !== 200){
                    window.alert("Invalid Credentials");
                } 
                return res.json();
            })
            .then(body => {
                console.log(body);
                if(body.message === "Auth successful") {
                    this.props.dispatch({
                        type: 'LOGIN',
                        authToken: body.token,
                        userName: signinUser,
                        admin: body.admin,
                        currentlySubscribed: body.paidSubscription
                    });
                    if(!body.paidSubscription){
                        window.alert("According to our records your subscription is not paid. If you have just subscribed, check your email. You might need to confirm your subscription with Paypal to access the site.");
                    }
                }
            })
            .catch(err => console.error('Error: ' + err));
        }
    }

    signup(e){
        e.preventDefault();
        const {signupEmail, signupUsername, signupPassword, signupPasswordConfirm, signupFirstName, signupLastName } = this.state;
        if(signupEmail === '' || signupUsername === '' || signupPassword === '' || signupPasswordConfirm === ''){
            window.alert("All fields must be filled");
        } else if(signupPassword !== signupPasswordConfirm){
            window.alert("Passwords do not match!")
        } else {
            fetch('https://api.bestclosershow.com/user/signup', {
                method: 'post',
                
                body: JSON.stringify({
                    email: signupEmail.replace(/\s/g,''),
                    userName: signupUsername.replace(/\s/g,''),
                    password: signupPassword,
                    firstName: signupFirstName,
                    lastName: signupLastName
                }),
              
                headers: {
                  'Content-Type': 'application/json'
                }
              
            }).then(res => {
                if(res.status !== 200){
                    window.alert("Username or email already in use");
                } 
                return res.json();
            })
            .then(body => {
                console.log(body);
                this.setState({
                    signinUser: signupEmail,
                    signinPassword: signupPassword
                });
                this.login();
            })
            .catch(err => console.error('Error: ' + err));
        }
    }


    render() { 
        let page;
        if(this.props.loggedIn === true){
            page = <SignedIn userName={this.props.userName} />
        } else {
            page = 
            <div id="forms-container">
                <div>
                    <form className="form" onSubmit={this.login}>
                        <h1 className="form-label" >LOG IN</h1>
                        <input onChange={this.updateField} id="signinUser" className="signup-input" type="text" placeholder="Username or Email" value={this.state.signinUser} />
                        <input onChange={this.updateField} id="signinPassword" className="signup-input" type="password" placeholder="Password" value={this.state.signinPassword} />
                        <input className="submit-button" type="submit" value="LOG IN" />
                    </form>
                    <Link to="/PASSWORD-RECOVERY" id="password-recovery">
                        Forgot your password? Click Here.
                    </Link>
                </div>
                <form className="form" onSubmit={this.signup}>
                    <h1 className="form-label" >SIGN UP</h1>
                    <input onChange={this.updateField} id="signupFirstName" className="signup-input" type="text" placeholder="First Name" value={this.state.signupFirstName} />
                    <input onChange={this.updateField} id="signupLastName" className="signup-input" type="text" placeholder="Last Name" value={this.state.signupLastName} />
                    <input onChange={this.updateField} id="signupUsername" className="signup-input" type="text" placeholder="Username" value={this.state.signupUsername.replace(/\s/g,'')} />
                    <input onChange={this.updateField} id="signupEmail" className="signup-input" type="text" placeholder="Email" value={this.state.signupEmail.replace(/\s/g,'')} />
                    <input onChange={this.updateField} id="signupPassword" className="signup-input" type="password" placeholder="Password" value={this.state.signupPassword} />
                    <input onChange={this.updateField} id="signupPasswordConfirm" className="signup-input" type="password" placeholder="Confirm Password" value={this.state.signupPasswordConfirm} />
                    <input className="submit-button" type="submit" value="SIGN UP" />
                </form>
            </div>
        }
        return ( 
            <React.Fragment>
                {page}
            </React.Fragment>
        );
    }
}
 
const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    authToken: state.authToken,
    userName: state.userName
});
 
export default connect(mapStateToProps)(Signup);