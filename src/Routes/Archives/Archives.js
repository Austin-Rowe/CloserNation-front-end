import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './Archives.css';

class Archive extends React.Component {
    constructor(props) {
        super(props);

        this.setReduxSelectedArchive = this.setReduxSelectedArchive.bind(this);
    }

    setReduxSelectedArchive(){
        this.props.dispatch({
            type: "SELECTARCHIVE",
            selectedArchive: this.props.archive
        });
    }

    render() {

        return ( 
            <Link to="/WATCH-ARCHIVE" onClick={this.setReduxSelectedArchive} >
                <div className="archive-container">
                    <h1 className="archive-title">{this.props.title}</h1>
                    <p className="archive-description">{this.props.description}</p>
                </div>
            </Link>
        );
    }
}
 
class Archives extends Component {
    constructor(props){
        super(props);

        this.getResources = this.getResources.bind(this);
    }

    getResources(){
        fetch('http://bestclosershow.com/resources', {
            
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
        if(this.props.archivedShows.length  < 1){
            this.getResources();
            console.log("getResources() ran");
        }
    }

    render() { 
        const archives = this.props.archivedShows.map(archive => <Archive archive={archive} dispatch={this.props.dispatch} title={archive.title} description={archive.description} key={archive.title}  /> );
        return ( 
            <div id="archives-container">
                {this.props.loggedIn? null : <Redirect to="/ACCOUNT" />}
                <h1>ARCHIVED SHOWS</h1>
                <div>
                    {archives}
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
    archivedShows: state.archivedShows
});
 
export default connect(mapStateToProps)(Archives);