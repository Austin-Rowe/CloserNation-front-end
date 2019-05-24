import { createStore } from 'redux';

const initialState = {
    loggedIn: false,
    authToken: '',
    userName: '',
  };
  
const reducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN": return {...state, loggedIn: true, authToken: action.authToken, userName: action.userName};
        case "LOGOUT": return {...state, loggedIn: false, authToken: '', userName: ''};
        default: return state;
    }
}
  
const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);
  
export default store;