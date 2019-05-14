import React, { Component } from 'react'; 

import chatFuncs from '../../API/chat';

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtcm93ZTIwMThAZ21haWwuY29tIiwidXNlck5hbWUiOiJyb3dlbWFuIiwiX2lkIjoiNWNkMzcxOGFlNzc3YzEyNTk4NTM2OGNiIiwicGFpZFN1YnNjcmlwdGlvbiI6ZmFsc2UsImFkbWluIjp0cnVlLCJpYXQiOjE1NTc4NjM4MDksImV4cCI6MTU1Nzg5MjYwOX0.h6ELCSlt3LGnxYnpasxVfjpk87l3_HZ5X_VTNTAdZsY';
class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            messages: [],
            message: ''
        }
        
        /* chatFuncs.connectChat(userToken, 
            message => {
                console.log('connected to chat ' + message);
            },
            error => {
                this.setState({error: error});
                console.log('error ' + error);
            }
        );

        chatFuncs.postMessage(userToken, 'I would love some tea');

        chatFuncs.handleIncomingMessage(message => {
            this.setState(state => ({
                messages: [...state.messages, message]
            }));
            console.log('recieved message: ' + message);
        }); */

        chatFuncs.handleIncomingMessage(message => {
            this.setState(state => ({
                messages: [...state.messages, message]
            }));
            console.log('recieved message: ' + message);
        });

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(){
        chatFuncs.postMessage(userToken, this.state.message);
        this.setState({message: ''});
    }
    
    render() { 
        let messages = this.state.messages.map(message => 
            <li>{message}</li>    
        )
        return ( 
            <div>
                <ul>{messages}</ul>
                <input type='text' value={this.state.message} onChange={event => this.setState({message: event.target.value})} />
                <button onClick={this.sendMessage}>Send</button>
            </div>            
        );
    }
}
 
export default Chat;