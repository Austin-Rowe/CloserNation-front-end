import React, { Component } from 'react';

import './Archives.css';

const Archive = (props) => {
    return ( 
        <div>
            <img src="" alt=""/>
        </div>
    );
}
 
class Archives extends Component {
    state = {  }
    render() { 
        return ( 
            <div id="archives-container">
                <h1>Archived Shows</h1>
                <ul id="archives-list">
                    <Archive />
                </ul>
            </div>
        );
    }
}
 
export default Archives;