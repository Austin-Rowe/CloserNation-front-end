import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './Archives.css';

class Archive extends React.Component {
    constructor(props) {
        super(props);

        this.setReduxSelectedArchive = this.setReduxSelectedArchive.bind(this);
        this.removeArchive = this.removeArchive.bind(this);
    }

    setReduxSelectedArchive(){
        this.props.dispatch({
            type: "SELECTARCHIVE",
            selectedArchive: this.props.archive
        });
    }

    removeArchive(e){
        e.preventDefault();
        const { archive, authToken } = this.props;
        fetch(`https://api.bestclosershow.com/resources/${archive._id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        }).then(res => {
            if(res.status !== 200){
                window.alert("Resource not deleted");
            } else if (res.status === 200) {
                window.alert("Resource deleted");
                this.props.dispatch({
                    type: "CLEARARCHIVES"
                });
            }
        })
        .catch(err => console.error('Error: ' + err));
    }


    render() {

        return ( 
            <Link to="/WATCH-ARCHIVE" onClick={this.setReduxSelectedArchive} >
                <div className="archive-container">
                    <h1 className="archive-title">{this.props.title}</h1>
                    {this.props.admin? <h1 className="delete-archive-button" onClick={this.removeArchive} >DELETE</h1> : null }
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
        this.getResources();
    }

    render() { 
        const archives = this.props.archivedShows.map(archive => <Archive archive={archive} dispatch={this.props.dispatch} title={archive.title} description={archive.description} key={archive.title} authToken={this.props.authToken} admin={this.props.admin} /> );
        return ( 
            <div id="archives-container">
                {this.props.admin? <Link to="/ADD-ARCHIVE"><h1 id="add-archive-link">ADD ARCHIVE</h1></Link> : null}
                {this.props.loggedIn? null : <Redirect to="/ACCOUNT" />}
                {this.props.currentlySubscribed? null : <Redirect to='/ACCOUNT' />}
                <h1 onClick={this.getResources} className={archives.length < 1? "link" : null}>ARCHIVED SHOWS</h1>
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
    archivedShows: state.archivedShows,
    currentlySubscribed: state.currentlySubscribed
});
 
export default connect(mapStateToProps)(Archives);