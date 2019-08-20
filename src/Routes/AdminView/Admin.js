import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Chat from '../StreamPage/Chat';
import './Admin.css';

// const UserInfoField = (props) => {
//     return ( 
//         <h1>{props.label}: {props.value}</h1>
//     );
// }
 

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkUserName: '',
            archiveFile: null,
            archiveTitle: '',
            archiveDescription: '',
            awaitingArchiveConfirmation: false
        }

        this.updateField = this.updateField.bind(this);
        this.addArchiveFile = this.addArchiveFile.bind(this);
        this.uploadArchive = this.uploadArchive.bind(this);
    }
    
    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    addArchiveFile(e){
        this.setState({archiveFile: e.target.files[0]});
    }

    uploadArchive(){
        let formData = new FormData();

        formData.append('video', this.state.archiveFile);
        formData.append('title', this.state.archiveTitle);
        formData.append('description', this.state.archiveDescription);

        this.setState({awaitingArchiveConfirmation: true});
        fetch('https://api.bestclosershow.com/resources/new-resource', {
            method: 'POST',
            headers: {
                'Authorization': this.props.authToken
            },
            body: formData
        })
        .then(response => {
            this.setState({awaitingArchiveConfirmation: false});
            if(response.status === 200){
                window.alert("Resource Successfully Uploaded");
            }
            response.json();
        })
        .then(res => console.log(res))
        .catch(error => console.error('Error:', error));
    }

    render() { 
        return ( 
            <div id="admin-container">
                {this.props.admin? null : <Redirect to="/ACCOUNT" />}
                <h1 id="admin-title">ADMIN VIEW</h1>
                <div id="admin-items-container">
                    {/* <div className="admin-item">
                        <h2>Check user Info</h2>
                        <input onChange={this.updateField} id="checkUserName" className="admin-input" type="text" placeholder="Username or Email" value={this.state.checkUserName} />
                        <button className="admin-button" >Check User Status</button>
                        <div>
                            <UserInfoField label="paidSubscription" value="true" />
                        </div>
                    </div> */}
                    <div className="admin-item">
                        <h2>Stream/Chat</h2>
                        <ReactPlayer width="100%" height="auto" url="https://stream.bestclosershow.com/hls/stream.m3u8" onError={console.log("Playback error admin view.")} playing controls playsinline />
                        <div id="admin-chat">
                            <Chat />
                        </div>
                    </div>
                    <div className="admin-item">
                        <h2>Add Archive</h2>
                        {this.state.awaitingArchiveConfirmation?
                            <h1>Awaiting Upload Confirmation...</h1>
                            :
                            <React.Fragment>
                                <input type="text" id="archiveTitle" onChange={this.updateField} className="admin-input" placeholder="Archive Title" value={this.state.archiveTitle} />
                                <textarea type="text" id="archiveDescription" onChange={this.updateField} className="admin-input" placeholder="Archive Description" value={this.state.archiveDescription} />
                                <input type="file" name="Archive" onChange={this.addArchiveFile} />
                                <button onClick={this.uploadArchive}>UPLOAD</button>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
 
const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    authToken: state.authToken,
    admin: state.admin,
});
 
export default connect(mapStateToProps)(Admin);
