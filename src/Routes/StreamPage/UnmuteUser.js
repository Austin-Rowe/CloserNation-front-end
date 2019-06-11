import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UnmuteUser.css';

class MutedUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false
        }

        this.unmuteUser = this.unmuteUser.bind(this);
    }

    unmuteUser(){
        const { userName, authToken } = this.props;
        fetch(`http://bestclosershow.com/user/alter-permissions/${userName}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "changes": [
                    {"propName": "canChat", "value": true}
                ]
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
            
        }).then(res => {
            if(res.status !== 200){
                console.log("unmuting user failed")
            } else {
                this.setState({hidden: true});
                this.props.dispatch({
                    type: "REFETCHMUTEDUSERLIST",
                    refetch: true
                })
            }
        })
        .catch(err => console.error('Error: ' + err));
    }

    render() {
        return(
            <button className={this.state.hidden? "muted-user-button" : "muted-user-button"} onClick={this.unmuteUser} >{this.props.userName}</button>        
        )
    }
}


class UnmuteUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            mutedUserNames: []
        }

        this.fetchMutedUsers = this.fetchMutedUsers.bind(this);
    }

    fetchMutedUsers(){
        if(this.props.refetchMutedUserList){
            fetch(`http://localhost:3000/user/muted-users`, {
                headers: {
                    'Authorization': this.props.authToken
                }
                
            }).then(res => {
                if(res.status !== 200){
                    console.error("error retrieving muted users unmuteUser Comp")
                } else if(res.status === 200){
                    this.props.dispatch({
                        type: "REFETCHMUTEDUSERLIST",
                        refetch: false
                    })
                }
                return res.json();
            })
            .then(body => {
                console.log(body);
                this.setState({mutedUserNames: body});
            })
            .catch(err => console.error('Error: ' + err));
        }
    }

    componentDidMount(){
        this.fetchMutedUsers();
    }

    componentDidUpdate(){
        this.fetchMutedUsers();
    }

    render() { 
        let mutedUsers;
        if(this.state.mutedUserNames.length === 0){
            mutedUsers = <div>NO USERS MUTED</div>
        } else {
            mutedUsers = this.state.mutedUserNames.map(username => <MutedUser userName={username} key={username} authToken={this.props.authToken } dispatch={this.props.dispatch} />)
        }
        return ( 
            <div id="unmute-users-container">
                <h1>Muted Users</h1>
                <p>To unmute a user click their button. Their username should disapper.</p>
                <ul id="muted-users-list-container">{mutedUsers}</ul>
            </div>
        );
    }
}
 
const mapStateToProps = state => ({
    authToken: state.authToken,
    admin: state.admin,
    refetchMutedUserList: state.refetchMutedUserList
});
  
export default connect(mapStateToProps)(UnmuteUser);
