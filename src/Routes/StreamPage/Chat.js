import React, { Component } from 'react'; 
import { connect } from 'react-redux';

import chatFuncs from '../../API/chat';
import './Chat.css';


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
            chatFuncs.postMessage(this.props.authToken, this.state.message);
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
    streamAddress: state.streamAddress
});
  
export default connect(mapStateToProps)(Chat);
