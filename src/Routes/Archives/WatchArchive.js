import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './WatchArchive.css';

import Archives from './Archives';

class WatchArchive extends Component {
    constructor(props){
        super(props);
    }
    
    render() { 
        const { title, URL, description, isStreamLink } = this.props.archive;
        return ( 
            <div id="watch-archive-container">
                {this.props.loggedIn? null: <Redirect to="/ACCOUNT" />}
                {isStreamLink? <Redirect to="/STREAM" /> : null}
                <div id="watch-archive-video-container">
                    <video id="archive-video" src={URL} type="video/mp4" autoPlay controls controlsList="nodownload" >Update to a modern browser to view video.</video>
                    <h1>{title}</h1>
                    <p id="watch-archive-description">{description}</p>
                </div>
                <div id="archives-wrapper">
                    <Archives />
                </div>
            </div>
        );
    }
}
 
const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    authToken: state.authToken,
    userName: state.userName,
    admin: state.admin,
    archive: state.selectedArchive
});
 
export default connect(mapStateToProps)(WatchArchive);
