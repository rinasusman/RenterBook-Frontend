import { combineReducers } from 'redux';
import userAuthReducer from '../container/userAuth.slice';


const rootReducer = combineReducers({
    userAuthState: userAuthReducer,

});

export default rootReducer;
