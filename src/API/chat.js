import openSocket from 'socket.io-client'; 
const  socket = openSocket('http://localhost:3000');

const chatFuncs = {
    connectChat: (userToken, handleChat, handleError) => {
        socket.on('connectToChat', message => handleChat(message));
        socket.on('err', error => handleError(error));
        socket.emit('connectToChat', {token: userToken});
    },
    postMessage: (userToken, message) => {
        socket.emit('post message', {message: message, token: userToken});
    },
    handleIncomingMessage: (handler) => {
        socket.on('new message', message => handler(message));
    }
}



export default chatFuncs;