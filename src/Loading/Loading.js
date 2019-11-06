import React from 'react';
import Loader from 'react-loader-spinner'

import './Loading.css';

const Loading = (props) => {
    return ( 
        <div id="loading-container">
            <Loader
                className="loader"
                type="BallTriangle"
                color="white"
                height={100}
                width={100}
            />
            <h1>{props.message}</h1>
        </div>
    );
}
 
export default Loading;