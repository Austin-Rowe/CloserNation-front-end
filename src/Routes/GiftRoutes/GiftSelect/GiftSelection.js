import React, { Component } from 'react';

import './GiftSelection.css';

import Loading from '../../../Loading/Loading';


class GiftOption extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    select = () => {
        this.setState({loading: true});
        fetch(`https://api.bestclosershow.com/gift/create-transaction/${this.props.months}`)
        .then(res => {
            if(res.status !== 200){
                this.setState({loading: false});
                window.alert('Something went wrong creating the paypal transaction. Please try again!')
            }
            return res.json();
        })
        .then(body => {
            console.log(body.approvalLink);
            if(body.approvalLink){
                window.location.href = body.approvalLink
            }
        })
        .catch(err => {
            console.error(err);
            this.setState({loading: false});
        });
    }

    render() {
        let containerClass;
        if(this.props.months === 12){
            containerClass = 'gift-option year'
        } else if(this.props.months === 6){
            containerClass = 'gift-option half-year'
        } else if(this.props.months === 3){
            containerClass = 'gift-option quarter-year'
        } else {
            containerClass = 'gift-option'
        }
        
        return ( 
            <React.Fragment>
                {this.state.loading? <Loading message="Setting Up a PayPal Transaction" /> : null}
                <div onClick={this.select} className={containerClass}>
                    <h2>{this.props.months} {this.props.months === 1? "MONTH" : "MONTHS"}</h2>
                    <h1><sup>$</sup>{this.props.months * 5}</h1>
                </div>
            </React.Fragment>
        );
    }
}
 

class GiftSelection extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <ol>
                    <h1 style={{margin: "10px auto"}}>How To Give</h1>
                    <li>Select an option</li>     
                    <li>Pay on PayPal</li>
                    <li>Share the link on the page you are redirected to with the recipient ONLY</li>
                </ol>
                <div id="gift-options-container">
                    <GiftOption months={12} />
                    <GiftOption months={6} />
                    <GiftOption months={3} />
                    <GiftOption months={1} />
                </div>
            </React.Fragment>
        );
    }
}
 
export default GiftSelection;