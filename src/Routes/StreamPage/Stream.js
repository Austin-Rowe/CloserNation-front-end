import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import Chat from './Chat';

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
    this.setState({playBackError: true});
  }

  render () {
    return <React.Fragment>
      {this.state.playBackError? 
        <h1>You either don't have authentication to view this resource or it is currently not live.</h1>
        :
        <ReactPlayer url='https://stream.bestclosershow.com/hls/stream.m3u8' onError={this.onPlayError} playing controls />
      }
      <Chat />
    </React.Fragment>
  }
}

export default Stream;