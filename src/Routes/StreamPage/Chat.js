import React, { Component } from 'react'; 
import { connect } from 'react-redux';

import chatFuncs from '../../API/chat';
import './Chat.css';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            muted: false
        }

        this.toggleMute = this.toggleMute.bind(this);
    }

    toggleMute(){
        const { userName } = this.props.messageObj;
        fetch(`http://localhost:3000/user/alter-permissions/${userName}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "changes": [
                    {"propName": "canChat", "value": false}
                ]
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.authToken
            }
            
        }).then(res => {
            if(res.status !== 200){
                console.log("muting user failed")
            } 
            if(res.status === 200){
                this.setState(state => ({muted: !state.muted}))
            }
            return res.json();
        })
        .then(body => {
            console.log(body);
        })
        .catch(err => console.error('Error: ' + err));
    }

    render() {
        const { messageObj} = this.props;
        return ( 
            <li className="message-container">
                <div className="username-label">{messageObj.userName}</div>
                {this.props.admin? 
                    <div className="mute" onClick={this.toggleMute} >MUTE</div>
                    :
                    null
                }
                <p className='chat-message' >{messageObj.message}</p>
            </li>
        );
    }
}
 
class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            messages: [],
            message: '',
            messageErr: false,
            errMessage: '',
            mutedUserNames: []
        }

        chatFuncs.handleIncomingMessage(
            message => {
                this.setState(state => ({
                    messages: [...state.messages, message]
                }));
                console.log('recieved message: ' + message);
                const messages = document.getElementById("messages-list");
                messages.scrollTop = messages.scrollHeight;
            },
            err => {
                console.log('error', err);
            }
        );

        this.loadMutedUserList = this.loadMutedUserList.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    loadMutedUserList(){
        fetch(`http://localhost:3000/user/muted-users`, {
            headers: {
                'Authorization': this.props.authToken
            }
            
        }).then(res => {
            if(res.status !== 200){
                console.error("error retrieving muted users")
            } 
            return res.json();
        })
        .then(body => {
            this.setState({mutedUserNames: body})
        })
        .catch(err => console.error('Error: ' + err));
    }

    componentDidMount(){
        this.loadMutedUserList();
    }

    sendMessage(e){
        e.preventDefault();
        if(this.state.message === ''){
            window.alert("Message cannot be blank");
        }else if(this.state.message.length > 500){
            window.alert("Message cannot be more than 500 characters");
        } else {
            console.log('sent message: ' + this.state.message);
            chatFuncs.postMessage(this.props.authToken, this.state.message);
            this.setState({message: ''});
        }
    }

    
    
    render() { 
        let messages;
        if(this.state.messages.length === 0){
            messages = <div id="empty-chat-message">No messages yet</div>
        } else {
            messages = this.state.messages.map(messageObj => 
                <Message key={messageObj.userName + '_' + this.state.messages.indexOf(messageObj)} messageObj={messageObj} admin={this.props.admin} user={this.props.userName} authToken={this.props.authToken} />   
            )
        }
        return ( 
            <div id="chat-holder" >
                <ul id="messages-list">{messages}</ul>
                <form id="message-form" onSubmit={this.sendMessage}>
                    <input id="message-input" type='text' value={this.state.message} onChange={event => this.setState({message: event.target.value})} />
                </form>
                <button id="message-submit" onClick={this.sendMessage} alt="submit">
                    <img id="message-submit-image" src="/Nav-Images/ic-send_97591.png" alt="SEND"/>
                </button>
            </div>            
        );
    }
}
 

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    authToken: state.authToken,
    userName: state.userName,
    streamAddress: state.streamAddress,
    admin: state.admin
});
  
export default connect(mapStateToProps)(Chat);
