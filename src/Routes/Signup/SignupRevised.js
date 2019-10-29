import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';


import './Signup.css';
import './SignupRevised.css';
import SignedIn from './SignedIn';

class SignupRevised extends Component {
    constructor(props){
        super(props);

        this.state = {
            signupEmail: '',
            signupUsername: '',
            signupPassword: '',
            signupPasswordConfirm: '',
            signupFirstName: '',
            signupLastName: '',
            signupPromoCode: '',
            signinUser: '',
            signinPassword: '',
            signupSelected: false
        }

        this.updateField = this.updateField.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    componentDidMount(){
        ReactGA.initialize('UA-149455210-2');
        if(this.props.loggedIn){
            ReactGA.pageview('/logged-in');
        } else {
            ReactGA.pageview('/login');
        }
    }

    toggleSelected(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.target.id === 'signup'){
            this.setState({signupSelected: true});
        } else if(e.target.id === 'login'){
            this.setState({signupSelected: false});
        }
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    login(e){
        if(e){
            e.preventDefault();
            e.stopPropagation();
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
                if(body.hasPaypalRecurringId && !body.paidSubscription){
                    window.alert('IF YOU DID NOT SUBSCRIBE YET DISREGARD THIS MESSAGE. Otherwise, we are currently awaiting payment confirmation from PayPal to verify your subscription and grant you access to the show. If this message continues for more than 24 hours please cancel the subscription via your PayPal account and re-subscribe.');
                }
                if(body.message === "Auth successful") {
                    this.props.dispatch({
                        type: 'LOGIN',
                        authToken: body.token,
                        userName: signinUser,
                        admin: body.admin,
                        currentlySubscribed: body.paidSubscription,
                        freeDayToken: body.freeDayToken,
                        freeDayTokenUsed: body.freeDayTokenUsed
                    });
                    if(!body.paidSubscription && typeof(body.freeDayToken) !== "string"){
                        window.alert("According to our records your subscription is not paid. If you have just subscribed and are still getting this message check your email because paypal may require you to confirm the transaction.");
                    }
                }
            })
            .catch(err => console.error('Error: ' + err));
        }
    }

    signup(e){
        e.preventDefault();
        const {signupEmail, signupUsername, signupPassword, signupPasswordConfirm, signupFirstName, signupLastName, signupPromoCode } = this.state;
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
                    lastName: signupLastName,
                    promoCode: signupPromoCode
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
        } else if(false) {
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
                    <input onChange={this.updateField} id="signupPromoCode" className="signup-input" type="text" placeholder="Promo Code" value={this.state.signupPromoCode.trim()} />
                    <input className="submit-button" type="submit" value="SIGN UP" />
                </form>
            </div>
        } else {
            page = 
            <div id="signup-signin-container">
                <div id="selections-bar">
                    <h1 onClick={this.toggleSelected} id="login" style={{borderTopLeftRadius: '15px', borderBottomRightRadius: '5px'}} className={!this.state.signupSelected? "sign-option selected-option" : 'sign-option'}>LOG IN</h1>
                    <h1 onClick={this.toggleSelected} id="signup" style={{borderTopRightRadius: '15px', borderBottomLeftRadius: '5px'}} className={this.state.signupSelected? "sign-option selected-option" : 'sign-option'}>SIGNUP</h1>
                </div>
                <div id="selected-container">
                    {this.state.signupSelected? 
                        <form className="form" onSubmit={this.signup}>
                            <input onChange={this.updateField} id="signupFirstName" className="signup-input" type="text" placeholder="First Name" value={this.state.signupFirstName} />
                            <input onChange={this.updateField} id="signupLastName" className="signup-input" type="text" placeholder="Last Name" value={this.state.signupLastName} />
                            <input onChange={this.updateField} id="signupUsername" className="signup-input" type="text" placeholder="Username" value={this.state.signupUsername.replace(/\s/g,'')} />
                            <input onChange={this.updateField} id="signupEmail" className="signup-input" type="text" placeholder="Email" value={this.state.signupEmail.replace(/\s/g,'')} />
                            <input onChange={this.updateField} id="signupPassword" className="signup-input" type="password" placeholder="Password" value={this.state.signupPassword} />
                            <input onChange={this.updateField} id="signupPasswordConfirm" className="signup-input" type="password" placeholder="Confirm Password" value={this.state.signupPasswordConfirm} />
                            <input onChange={this.updateField} id="signupPromoCode" className="signup-input" type="text" placeholder="Promo Code" value={this.state.signupPromoCode.trim()} />
                            <input className="submit-button" type="submit" value="SIGN UP" />
                        </form>
                        :
                        <div>
                            <form className="form" onSubmit={this.login}>
                                <input onChange={this.updateField} id="signinUser" className="signup-input" type="text" placeholder="Username or Email" value={this.state.signinUser} />
                                <input onChange={this.updateField} id="signinPassword" className="signup-input" type="password" placeholder="Password" value={this.state.signinPassword} />
                                <input className="submit-button" type="submit" value="LOG IN" />
                            </form>
                            <Link to="/PASSWORD-RECOVERY" id="password-recovery">
                                Forgot your password? Click Here.
                            </Link>
                        </div>
                    }
                </div>
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
 
export default connect(mapStateToProps)(SignupRevised);