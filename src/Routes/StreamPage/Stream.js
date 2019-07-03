import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Chat from './Chat';
import UnmuteUser from './UnmuteUser';
import './Stream.css';


class Stream extends Component {
  constructor(){
    super();
    this.state = {
      playBackError: false
    }
    this.onPlayError = this.onPlayError.bind(this);
    this.getResources = this.getResources.bind(this);
  }

  getResources(){
    fetch('https://api.bestclosershow.com/resources', {
        
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.props.authToken
        }
          
      }).then(res => {
        if(res.status !== 200){
          console.log("getResources fetch failed")
        }
        return res.json();
      })
      .then(body => {
        let archives = [];
        body.docs.forEach(doc => {
          if(doc.isStreamLink){
              this.props.dispatch({
                type: 'SETSTREAMADDRESS',
                streamAddress: doc.URL
              });
          } else {
            archives.push(doc);
          }
        });
        this.props.dispatch({
          type: 'SETARCHIVEDSHOWS',
          archivedShows: archives
        });
      })
      .catch(err => console.error('Error: ' + err));
  }

  componentDidMount(){
    if(!this.props.streamAddress){
      this.getResources();
      console.log("getResources() ran");
    }
  }

  onPlayError(){
    console.log("onPlayError fired");
    this.setState({playBackError: true});
  }

  render () {
    return (
      <div id="stream-chat-container">
        {this.props.loggedIn? null : <Redirect to='/ACCOUNT' />}
        {this.props.currentlySubscribed? 
          null 
          : 
          this.props.freeDayTokenUsed?
            <Redirect to='/ACCOUNT' />
            :
            null
        }
        <div id="stream-container">
          <h1 id="stream-label">Best Closer Show LIVE</h1>
          {this.state.playBackError? 
            <div id="playback-error-container">
              <h1 id="playback-error-comment">Awaiting Live Show</h1>
              <button onClick={() => this.setState({playBackError: false})} id="refresh-stream-button">Refresh Stream</button>
            </div>
            :
            <ReactPlayer width="100%" height="auto" url={this.props.streamAddress} onError={this.onPlayError} playing controls playsinline />
          }
        </div>
        <div id="chat-container">
          <Chat />
        </div>
        {this.props.admin? 
          <div id="unmute-user-container">
            <UnmuteUser />
          </div>
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  authToken: state.authToken,
  userName: state.userName,
  streamAddress: state.streamAddress,
  admin: state.admin,
  currentlySubscribed: state.currentlySubscribed,
  freeDayToken: state.freeDayToken,
  freeDayTokenUsed: state.freeDayTokenUsed
});

export default connect(mapStateToProps)(Stream);
