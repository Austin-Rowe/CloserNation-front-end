import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';

import './WatchArchive.css';

import Chat from '../StreamPage/Chat';

class WatchArchive extends Component {

    componentDidMount(){
        ReactGA.initialize('UA-149455210-2');
        ReactGA.pageview(`/watching-archive/date=${this.props.archive.date}`);
    }

    render() { 
        const { title, description, isStreamLink } = this.props.archive;
        const URL = `https://api.bestclosershow.com/resources/video/${this.props.archive.fileNames.video}?Authorization=${this.props.authToken}`;
        let rawDate = this.props.archive.date.replace(/-/g,',');
        let dateObj = new Date(rawDate);
        let date = dateObj.toDateString();        return ( 
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
                    <h1>{title} #{this.props.archive.showNumber} {date}</h1>
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


