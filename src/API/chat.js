import openSocket from 'socket.io-client'; 
const socket = openSocket('https://api.bestclosershow.com');

const chatFuncs = {
    
    postMessage: (userToken, message) => {
        socket.emit('post message', {message: message, token: userToken});
    },
    handleIncomingMessage: (handler, errHandler) => {
        socket.on('new message', message => handler(message));
        socket.on('err', error => errHandler(error));
    }
}



export default chatFuncs;