import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import Chat from './Chat';
import './Stream.css';

class Stream extends Component {
  constructor(){
    super();
    this.state = {
      playBackError: false
    }
    this.onPlayError = this.onPlayError.bind(this);
  }

  onPlayError(){
    console.log('onPlayError() was fired')
    /* this.setState({playBackError: true}); */
  }

  render () {
    return <React.Fragment>
      {this.state.playBackError? 
        <h1>You either don't have authentication to view this resource or it is currently not live.</h1>
        :
        <div id="stream-chat-container">
          <div id="stream-container">
            <ReactPlayer width="100%" height="auto" url='https://stream.bestclosershow.com/hls/stream.m3u8' onError={this.onPlayError} playing controls />
            <h1 id="stream-label">Closer Nation Show LIVE</h1>
          </div>
          <div id="chat-container">
            <Chat />
          </div>
        </div>
      }
    </React.Fragment>
  }
}

export default Stream;