import { createStore } from 'redux';

const initialState = {
    loggedIn: false,
    authToken: '',
    userName: '',
    currentlySubscribed: false,
    streamAddress: '',
    archivedShows: [],
    admin: false,
    selectedArchive: {},
    refetchMutedUserList: true
};
  
const reducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN": return {...state, loggedIn: true, authToken: action.authToken, userName: action.userName, admin: action.admin, currentlySubscribed: action.currentlySubscribed};
        case "LOGOUT": return {...state, loggedIn: false, authToken: '', userName: '', admin: false};
        case "SETSTREAMADDRESS": return {...state, streamAddress: action.streamAddress};
        case "SETARCHIVEDSHOWS": return {...state, archivedShows: action.archivedShows};
        case "SELECTARCHIVE": return {...state, selectedArchive: action.selectedArchive};
        case "REFETCHMUTEDUSERLIST": return {...state, refetchMutedUserList: action.refetch};
        case "CLEARARCHIVES": return {...state, archivedShows: [], selectedArchive: {}};
        default: return state;
    }
}
  
const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);
  
export default store;