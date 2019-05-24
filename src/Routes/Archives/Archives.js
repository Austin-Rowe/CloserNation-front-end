import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Archives.css';

const Archive = (props) => {
    return ( 
        <Link to="/WATCH-ARCHIVE">
            <div className="archive-container">
                <img className="archive-image" src="/Nav-Images/Shield2.png" alt="BEST CLOSER SHOW"/>
                <h1 className="archive-title">{props.title}</h1>
                <p className="archive-description">{props.description}</p>
            </div>
        </Link>
    );
}
 
class Archives extends Component {
    state = {  }
    render() { 
        const dummyDescription = "In todays episode we will describe how the world is seemingly crumbling into chaos. The truth of the matter is that it IS NOT! There is a hidden plan that will change everything, and soon it will come to the light."
        return ( 
            <div id="archives-container">
                <h1>ARCHIVED SHOWS</h1>
                <div>
                    <Archive title="March 4th, 2019: Trump Bulldozes Frauds" description={dummyDescription} videoSource="https://s3.us-east-2.amazonaws.com/closer-nation-dummy-bucket/Moored_Boats_Calm_Lake.mp4" />
                    <Archive title="March 4th, 2019: Trump Bulldozes Frauds" description={dummyDescription} videoSource="https://s3.us-east-2.amazonaws.com/closer-nation-dummy-bucket/Moored_Boats_Calm_Lake.mp4" />
                    <Archive title="March 4th, 2019: Trump Bulldozes Frauds" description={dummyDescription} videoSource="https://s3.us-east-2.amazonaws.com/closer-nation-dummy-bucket/Moored_Boats_Calm_Lake.mp4" />
                    <Archive title="March 4th, 2019: Trump Bulldozes Frauds" description={dummyDescription} videoSource="https://s3.us-east-2.amazonaws.com/closer-nation-dummy-bucket/Moored_Boats_Calm_Lake.mp4" />
                </div>
            </div>
        );
    }
}
 
export default Archives;