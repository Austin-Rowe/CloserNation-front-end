import React, { Component } from 'react';
import ReactGA from 'react-ga';

import './PasswordRecover.css';

class PasswordRecover extends Component {
    constructor(props){
        super(props);

        this.state = {
            requestSuccessful: false,
            recoveryEmail: ''
        }

        this.updateField = this.updateField.bind(this);
        this.requestEmailReset = this.requestEmailReset.bind(this);

    }

    componentDidMount(){
        ReactGA.initialize('UA-149455210-2');
        ReactGA.pageview('/send-password-reset');
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    requestEmailReset(e){
        e.stopPropagation();
        e.preventDefault();
        fetch(`https://api.bestclosershow.com/password-reset-request/${this.state.recoveryEmail}`)
        .then(res => {
            if(res.status !== 200){
                window.alert("Email not found");
            } else if(res.status === 200){
                this.setState({requestSuccessful: true});
            }
        })
        .catch(err => {
            window.alert("An error occured!" + err);
        });
    }

    render() { 
        return ( 
            <div id="password-recover-container">
                <form className="form" onSubmit={this.requestEmailReset}>
                    <h1 className="form-label" >GET PASSWORD RESET EMAIL</h1>
                    <input onChange={this.updateField} id="recoveryEmail" className="signup-input" type="text" placeholder="Account Email" value={this.state.recoveryEmail} />
                    <input className="submit-button" type="submit" value="REQUEST EMAIL" />
                </form>
                {this.state.requestSuccessful?
                    <div id="request-success-message">
                        <h3>Password Recover Email Successfully Sent!</h3>
                        <p>If you don't recieve an email within 15 minutes return to this page and try again.</p>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}
 
export default PasswordRecover;