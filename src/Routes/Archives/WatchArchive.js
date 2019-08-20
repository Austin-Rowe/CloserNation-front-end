import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './WatchArchive.css';

import Chat from '../StreamPage/Chat';

class WatchArchive extends Component {
    render() { 
        const { title, description, isStreamLink, _id } = this.props.archive;
        const URL = this.props.archive.URL + `?Authorization=${this.props.authToken}`;
        return ( 
            <div id="watch-archive-container">
                {this.props.loggedIn? null: <Redirect to="/ACCOUNT" />}
                {this.props.currentlySubscribed? 
                    null 
                    : 
                    this.props.freeDayTokenUsed?
                    <Redirect to='/ACCOUNT' />
                    :
                    null
                }
                {isStreamLink? <Redirect to="/STREAM" /> : null}
                <div id="watch-archive-video-container">
                    <video id="archive-video" src={URL} type="video/mp4" autoPlay controls controlsList="nodownload" >Update to a modern browser to view video.</video>
                    <h1>{title}</h1>
                    <p id="watch-archive-description">{description}</p>
                </div>
                <div id="archives-chat-wrapper">
                    <Chat />
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
    archive: state.selectedArchive,
    currentlySubscribed: state.currentlySubscribed,
    freeDayTokenUsed: state.freeDayTokenUsed
});
 
export default connect(mapStateToProps)(WatchArchive);


