import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';

import Chat from '../StreamPage/Chat';
import './Admin.css';

class ArchiveUpload extends Component {
    constructor(props){
        super(props);
        this.state = { 
            archiveTitle: '',
            archiveDescription: '',
            archiveFile: '',
            thumbnailFile: '',
            awaitingArchiveConfirmation: false,
            archiveFileDuration: '',
            archiveDate: '',
            archiveNumber: ''
        };

        this.updateField = this.updateField.bind(this);
        this.addArchiveFile = this.addArchiveFile.bind(this);
        this.addThumbnailFile = this.addThumbnailFile.bind(this);
        this.uploadArchive = this.uploadArchive.bind(this);
    }

    componentDidMount(){
        ReactGA.initialize('UA-149455210-2');
        ReactGA.pageview(`/admin-page`);
    }

    updateField(e){
        this.setState({[e.target.id]: e.target.value});
    }

    addArchiveFile(e){
        this.setState({archiveFile: e.target.files[0]});
        
        let document = window.document;
        const dummyVideoEl = document.createElement('video');
        dummyVideoEl.src = URL.createObjectURL(e.target.files[0]);
        
        let setDuration = setInterval(() => {
            if(typeof dummyVideoEl.duration === 'number' && dummyVideoEl.duration > 1){
                console.log('setting duration');
                this.setState({archiveFileDuration: Math.floor(dummyVideoEl.duration)});
                clearInterval(setDuration);
            } else {
                console.log('Value not set');
            }
        }, 500);
    }

    addThumbnailFile(e){
        this.setState({thumbnailFile: e.target.files[0]});
    }

    uploadArchive(){
        if(typeof this.state.archiveFileDuration !== 'number' || this.state.archiveFileDuration < 1 || typeof this.state.archiveFile !== 'object' || this.state.archiveTitle === '' || this.state.archiveDate.length < 1){
            window.alert('Double check the archive you are trying to upload. Something is not filled out properly');
        } else {
            let formData = new FormData();

            formData.append('video', this.state.archiveFile);
            formData.append('thumbnail', this.state.thumbnailFile);
            formData.append('title', this.state.archiveTitle);
            formData.append('description', this.state.archiveDescription);
            formData.append('date', this.state.archiveDate);
            //let jsDate = new Date(date.replace('-',', '))
            formData.append('duration', this.state.archiveFileDuration);
            formData.append('showNumber', this.state.archiveNumber);
    
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
                } else if(response.status !== 200){
                    window.alert('Error uploading resource!');
                }
                response.json();
            })
            .then(res => console.log(res))
            .catch(error => console.error('Error:', error));
        }
    }
    
    render() { 
        return ( 
            <div className="admin-item">
                <h2>Add Archive</h2>
                {this.state.awaitingArchiveConfirmation?
                    <h1>Awaiting Upload Confirmation...</h1>
                    :
                    <React.Fragment>
                        <input type="text" id="archiveTitle" onChange={this.updateField} className="admin-input" placeholder="Archive Title" value={this.state.archiveTitle} />
                        <input type="date" id="archiveDate" onChange={this.updateField} className="admin-input" placeholder="Show Date" value={this.state.archiveDate} />
                        <input type="number" id="archiveNumber" onChange={this.updateField} className="admin-input" placeholder="Show Number" value={this.state.archiveNumber} />
                        <textarea type="text" id="archiveDescription" onChange={this.updateField} className="admin-input" placeholder="Archive Description" value={this.state.archiveDescription} />
                        <label htmlFor="Archive" style={{fontWeight: 'bold'}}>Archive Video: </label>
                        <input id="archiveFile" type="file" name="Archive" onChange={this.addArchiveFile} />
                        <div style={{height: '20px'}}></div>
                        <label htmlFor="Thumbnail" style={{fontWeight: 'bold'}}>Thumbnail Image: </label>
                        <input type="file" name="Thumbnail" onChange={this.addThumbnailFile} />
                        <button onClick={this.uploadArchive} id="upload-button" className="admin-button">UPLOAD</button>
                    </React.Fragment>
                }
            </div>
        );
    }
}
 
 

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkUserName: '',
        }

        this.updateField = this.updateField.bind(this);
        
    }
    
    updateField(e){
        this.setState({[e.target.id]: e.target.value});
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
                    <ArchiveUpload authToken={this.props.authToken} />
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
