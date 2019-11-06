import React, { Component } from 'react';
import qs from 'query-string';

import './LinkPayout.css';

import Loading from '../../../Loading/Loading';

class LinkPayout extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: '',
            monthCount: '',
            paypalParams: {},
            accessLink: '',
            loading: false
        }
    }

    componentDidMount(){
        const paypalParams = qs.parse(this.props.location.search);
        const { monthCount, token } = this.props.match.params;
        this.setState({token, monthCount, paypalParams, loading: true});

        const localGiftObj = JSON.parse(localStorage.getItem('giftAccount'));

        if(localGiftObj && localGiftObj.paymentId === paypalParams.paymentId){
            this.setState({accessLink: localGiftObj.accessLink, loading: false});
        } else {
            fetch(`https://api.bestclosershow.com/gift/execute-payment`, {
                method: "POST",
                headers: {
                    'Authorization': token,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    payerID: paypalParams.PayerID,
                    paymentID: paypalParams.paymentId,
                })            
            })
            .then(res => {
                if(res.status !== 200){
                    window.alert("Payment was not successfully completed, this is most likely an issue with PayPal. Please try again!")
                }
                return res.json();
            })
            .then(body => {
                console.log(body);
                this.setState({accessLink: body.accessLink, loading: false});
                localStorage.setItem('giftAccount', JSON.stringify({
                    accessLink: body.accessLink,
                    paymentId: paypalParams.paymentId
                }));
            })
            .catch(err => {
                console.error(`Error: ${err}`);
                this.setState({loading: false});
            });
        }
    }

    render() { 
        return (
            <React.Fragment>
                {this.state.loading? <Loading message="Retrieving Gift Recipient's Access Link" /> : null}
                <div id="payout-container">
                    <h1>{this.state.monthCount} MONTH ACCESS LINK</h1>
                    <a href={this.state.accessLink}>{this.state.accessLink}</a>
                    <h1>Share this link with the recipient ONLY!</h1>
                    <p> Whover has this link can claim the time you bought for the recipient.</p>
                </div>
            </React.Fragment>  
        );
    }
}

export default LinkPayout;