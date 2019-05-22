import React, { Component } from 'react';

import './Signup.css';
import SignedIn from './SignedIn';

class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            signupEmail: '',
            signupUsername: '',
            signupPassword: '',
            signinUser: '',
            signinPassword: '',
            signedIn: false
        }

        this.updateField = this.updateField.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    login(e){
        e.preventDefault();
        const {signinUser, signinPassword} = this.state;
        if(signinPassword === '' || signinUser === ''){
            window.alert("Password or Email is blank!");
        } else {
            window.alert("this gets sent");
            fetch('http://localhost:3000/user/login', {
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
                    window.alert("LOGIN FAILURE! Please try again");
                } 
                return res.json();
            })
            .then(body => {
                console.log(body);
                this.setState({signedIn: true});
            })
            .catch(err => console.error('Error: ' + err));
        }
    }

    signup(e){
        e.preventDefault();
        const {signupEmail, signupUsername, signupPassword} = this.state;
        if(signupEmail === '' || signupUsername === '' || signupPassword === ''){
            window.alert("All fields must be filled");
        } else {
            window.alert("this gets sent");
            fetch('http://localhost:3000/user/signup', {
                method: 'post',
                
                body: JSON.stringify({
                    email: signupEmail,
                    userName: signupUsername,
                    password: signupPassword
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
            .then(body => console.log(body))
            .catch(err => console.error('Error: ' + err));
        }
    }


    render() { 
        let page;
        if(this.state.signedIn === true){
            page = <SignedIn />
        } else {
            page = <div id="forms-container">
                <form className="form" onSubmit={this.login}>
                    <h1 className="form-label" >LOG IN</h1>
                    <input onChange={this.updateField} id="signinUser" className="signup-input" type="text" placeholder="username or password" value={this.state.signinUser} />
                    <input onChange={this.updateField} id="signinPassword" className="signup-input" type="password" placeholder="password" value={this.state.signinPassword} />
                    <input className="submit-button" type="submit" value="LOG IN" />
                </form>
                <form className="form" onSubmit={this.signup}>
                    <h1 className="form-label" >SIGN UP</h1>
                    <input onChange={this.updateField} id="signupUsername" className="signup-input" type="text" placeholder="username" value={this.state.signupUsername} />
                    <input onChange={this.updateField} id="signupEmail" className="signup-input" type="email" placeholder="email" value={this.state.signupEmail} />
                    <input onChange={this.updateField} id="signupPassword" className="signup-input" type="password" placeholder="password" value={this.state.signupPassword} />
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
 
export default Signup;