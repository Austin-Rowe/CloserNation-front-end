import React, { Component } from 'react';

import './WatchArchive.css';

import Archives from './Archives';

class WatchArchive extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="watch-archive-container">
                <div id="watch-archive-video-container">
                    <video id="archive-video" src="https://s3.us-east-2.amazonaws.com/closer-nation-dummy-bucket/Moored_Boats_Calm_Lake.mp4" type="video/mp4" autoPlay controls controlsList="nodownload" >Update to a modern browser to view video.</video>
                    <h1>Video Title</h1>
                    <p>Video description</p>
                </div>
                <Archives />
            </div>
        );
    }
}
 
export default WatchArchive;