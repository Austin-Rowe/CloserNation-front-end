import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddArchive.css';

class AddArchive extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            href: '',
            description: 'Archive Description'
        }

        this.updateField = this.updateField.bind(this);
        this.addArchive = this.addArchive.bind(this);
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    addArchive(e){
        e.preventDefault();
        const { authToken } = this.props;
        const {title, href, description} = this.state;
        fetch(`https://api.bestclosershow.com/resources/new-resource`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify({
                "title": title,
	            "URL": href,
	            "description": description
            })
        }).then(res => {
            if(res.status !== 200){
                window.alert("Adding Archive Failed. Try again!");
            } else if (res.status === 200) {
                window.alert("Archive Added");
                this.props.dispatch({
                    type: "CLEARARCHIVES"
                });
            }
        })
        .catch(err => console.error('Error: ' + err));
    }

    render() { 
        return ( 
            <div>
                <form id="add-resource-form" className="form" onSubmit={this.addArchive}>
                    <h1 className="form-label" >ADD RESOURCE</h1>
                    <input onChange={this.updateField} id="title" className="signup-input" type="text" placeholder="Archive Title" value={this.state.title} />
                    <input onChange={this.updateField} id="href" className="signup-input" type="text" placeholder="Archive Link Address" value={this.state.href} />
                    <textarea onChange={this.updateField} name="description" id="description" form="add-resource-form" value={this.state.description}></textarea>                    
                    <input className="submit-button" type="submit" value="ADD ARCHIVE" />
                </form>
            </div>
        );
    }
}
 

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    authToken: state.authToken,
    userName: state.userName,
    admin: state.admin,
});
 
export default connect(mapStateToProps)(AddArchive);
