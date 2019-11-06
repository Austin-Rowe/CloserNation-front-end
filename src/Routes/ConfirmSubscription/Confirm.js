import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';


import './Confirm.css';
import Loading from '../../Loading/Loading';

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
            this.setState({confirmed: true});
        })
        .catch(err => {
            console.error(err);
            this.setState({confirmed: true});
        })
        ReactGA.initialize('UA-149455210-2');
        ReactGA.pageview('/awaiting-subscripiton-confirmation');
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.state.confirmed? 
                    <Redirect to='/ACCOUNT' />
                    :
                    <Loading message="Awaiting Confirmation of Subscription" />
                }
            </React.Fragment>
        );
    }
}
 
export default Confirm;