import React, { Component } from 'react';
import ReactGA from 'react-ga';

import './PasswordReset.css';

class PasswordReset extends Component {
    constructor(props){
        super(props);
        this.state = {
            resetSuccess: false,
            newPassword: '',
            confirmNewPassword: ''
        }

        this.sendPasswordResetRequest = this.sendPasswordResetRequest.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    componentDidMount(){
        ReactGA.initialize('UA-149455210-2');
        ReactGA.pageview('/changing-password');
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    sendPasswordResetRequest(){
        if(this.state.newPassword !== this.state.confirmNewPassword){
            window.alert("Passwords do not match!");
        } else {
            fetch('https://api.bestclosershow.com/password-reset-request', {
                method: 'post',
                
                body: JSON.stringify({
                    password: this.state.newPassword,
                    confirmPassword: this.state.confirmNewPassword, 
                    token: this.props.match.params.resetPasswordAuthToken
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status === 401){
                    window.alert('Reset email has expired. Please request another reset email and try again!');
                } else if(res.status === 500){
                    window.alert('Internal server error. Please request another reset email and try again!');
                } else if(res.status === 200){
                    this.setState({resetSuccess: true});
                }
            })
            .catch(err => window.alert(`Error with reset request: ${err}`));
        }
    }

    render() { 
        return ( 
            <div id="password-reset-container">
                <h1 id="password-reset-label">Reset Password for {this.props.match.params.userName}</h1>
                <input className="password-reset-input" value={this.state.newPassword} id="newPassword" onChange={this.updateField} type="password" placeholder="NEW PASSWORD"/>
                <input className="password-reset-input" value={this.state.confirmNewPassword} id="confirmNewPassword" onChange={this.updateField} type="password" placeholder="CONFIRM NEW PASSWORD"/>
                <button className="password-reset-input" id="password-reset-submit-button" onClick={this.sendPasswordResetRequest}>Change Password</button>
                {this.state.resetSuccess? 
                    <div id="password-reset-success-message">
                        <h3>Password Reset Successful!</h3>
                        <p>You should now have access to your account!</p>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}
 
export default PasswordReset;