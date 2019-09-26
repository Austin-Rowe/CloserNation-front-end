import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import './Confirm.css';

class Confirm extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: '',
            confirmed: false
        }
    }

    componentDidMount(){
        const {paymentConfirmationToken} = this.props.match.params;
        this.setState({token: paymentConfirmationToken});
        fetch(`https://api.bestclosershow.com/paypal/confirm-payment?Authorization=${paymentConfirmationToken}`)
        .then(res => {
            if(res.status === 200){
                window.alert("Subscription Confirmed! You now have access to the show.");
                this.setState({confirmed: true})
            }
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.state.confirmed? 
                    <Redirect to='/ACCOUNT' />
                    :
                    <h1 id="awaiting-confirmation-message">Awaiting Confirmation Subscription</h1>
                }
            </React.Fragment>
        );
    }
}
 
export default Confirm;