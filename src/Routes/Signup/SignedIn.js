import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

import './SignedIn.css';

class SignedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: '',
            password: '',
            deleteToggled: false,
            promoCode: ''
        }

        this.logout = this.logout.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.updateField = this.updateField.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.deleteToggle = this.deleteToggle.bind(this);
        this.applyPromo = this.applyPromo.bind(this);
    }

    componentDidMount(){
        ReactGA.initialize('UA-149455210-2');
        ReactGA.pageview('/logged-in');
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    logout(){
        this.props.dispatch({
            type: 'LOGOUT'
        });
    }

    deleteAccount(){
        if(window.confirm("Are you sure you want to PERMANENTLY DELETE YOUR ACCOUNT?")){
            fetch('https://api.bestclosershow.com/user', {
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

    subscribe(){
        fetch('https://api.bestclosershow.com/paypal/subscribe', {
            method: 'post',
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.authToken
            }
            
        }).then(res => {
            if(res.status !== 200){
                window.alert("Error subscribing. Please try again!");
            } 
            return res.json();
        })
        .then(body => {
            window.location.href = body.approvalLink;
        })
        .catch(err => console.error('Error: ' + err));
    }

    deleteToggle(e){
        e.preventDefault();
        this.setState(state => ({deleteToggled: !state.deleteToggled}));
    }

    applyPromo(){
        fetch('https://api.bestclosershow.com/user/apply-promo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.authToken
            },
            body: JSON.stringify({
                promoCode: this.state.promoCode
            })
        }).then(res => {
            if(res.status !== 200){
                if(res.status === 500){
                    window.alert('Internal Server Error')
                } else {
                    window.alert("Invalid Promo Code");
                }
            } else if(res.status === 200){
                window.alert("You have full access for 24 hours. Please logout and log back in to gain access.")
            }
        })
        .catch(err => console.error('Error: ' + err));
    }

    render() {
        const { props } = this;

        return ( 
            <div id="signed-in-container">
                <h1>Hello {props.userName}!</h1>
                <h2>Manage your account from this page.</h2>
                <button onClick={this.logout} className="signed-in-button logout" >Logout</button>
                {this.props.currentlySubscribed? null : <button onClick={this.subscribe} className="signed-in-button" >Subscribe</button>}
                {this.props.freeDayToken.length > 5? 
                    null
                    :
                    <React.Fragment>
                        <input onChange={this.updateField} id="promoCode" className="promo-input" type="text" placeholder="Promo Code" value={this.state.promoCode.trim()} />
                        <button onClick={this.applyPromo} className="signed-in-button" >Apply Promo</button>
                    </React.Fragment>
                }
                {this.props.admin? 
                    <Link to='/admin'>
                        <button  className="signed-in-button" >Admin Page</button>
                    </Link>
                    :
                    null
                }
                {this.state.deleteToggled?
                    <React.Fragment>
                        <input className="delete-confirmation-input" id="identity" type="text" placeholder="Username or Email" value={this.state.identity} onChange={this.updateField} />
                        <input className="delete-confirmation-input" id="password" type="password" placeholder="Password" value={this.state.password} onChange={this.updateField} />
                        <button onClick={this.deleteAccount} className="signed-in-button delete-account" >Delete Account</button>
                        <div id="delete-toggle" style={{marginTop: '30px'}} onClick={this.deleteToggle} >Click here to hide delete field.</div>
                    </React.Fragment>
                    :
                    <div id="delete-toggle" onClick={this.deleteToggle} >Want to delete your account? Click here.</div>
                }
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    authToken: state.authToken,
    userName: state.userName,
    currentlySubscribed: state.currentlySubscribed,
    freeDayToken: state.freeDayToken,
    freeDayTokenUsed: state.freeDayTokenUsed,
    admin: state.admin
});
 
export default connect(mapStateToProps)(SignedIn);