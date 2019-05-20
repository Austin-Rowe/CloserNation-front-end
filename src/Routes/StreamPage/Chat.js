import React, { Component } from 'react'; 

import chatFuncs from '../../API/chat';
import './Chat.css';

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvd2ViYWxsZXJAZ21haWwuY29tIiwidXNlck5hbWUiOiJyb3dlYmFsbGVyIiwiX2lkIjoiNWNkMzcxYzgwYmYwMTkyNWI0MjNlMDhlIiwicGFpZFN1YnNjcmlwdGlvbiI6ZmFsc2UsImFkbWluIjpmYWxzZSwiaWF0IjoxNTU4MzY4NTYxLCJleHAiOjE1NTgzOTczNjF9.9NC_zXD4HXv9Qt-96woGqe5zfEZK-fx3k81vQXBDy7o';

const Message = (props) => {
    const {messageObj} = props;
    return ( 
        <li className="message-container">
            <div className="username-label">{messageObj.userName}</div>
            <p className='chat-message' >{messageObj.message}</p>
        </li>
    );
}
 
class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            messages: [],
            message: '',
            messageErr: false,
            errMessage: ''
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

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(e){
        e.preventDefault();
        if(this.state.message === ''){
            window.alert("Message cannot be blank");
        }else if(this.state.message.length > 500){
            window.alert("Message cannot be more than 500 characters");
        } else {
            console.log('sent message: ' + this.state.message);
            chatFuncs.postMessage(userToken, this.state.message);
            this.setState({message: ''});
        }
    }
    
    render() { 
        let messages = this.state.messages.map(messageObj => 
            <Message key={messageObj.userName + this.state.messages.indexOf(messageObj)} messageObj={messageObj} />   
        )
        return ( 
            <div id="chat-holder" >
                <ul id="messages-list">{messages}</ul>
                <form id="message-form" onSubmit={this.sendMessage}>
                    <input id="message-input" type='text' value={this.state.message} onChange={event => this.setState({message: event.target.value})} />
                    <input id="message-submit" type='image' src='Nav-Images/ic-send_97591.png' onClick={this.sendMessage} alt="submit"/>
                </form>
            </div>            
        );
    }
}
 
export default Chat;