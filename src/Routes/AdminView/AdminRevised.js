import React, { useState }  from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';

import Chat from '../StreamPage/Chat';
import Loading from '../../Loading/Loading';
import './AdminRevised.css';

const AdminRevised = () => {

    return(
        <div id="admin-container">
            <div id="stream-chat-container">
                <ReactPlayer width="100%" height="auto" url="https://stream.bestclosershow.com/hls/stream.m3u8" onError={console.log("Playback error admin view.")} playing controls playsinline />
                <div id="admin-chat-container" >
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default AdminRevised;