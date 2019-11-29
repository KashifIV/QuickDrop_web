import auth from './authentication'; 
import fileNames from './fileReducer'; 
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    auth, 
    fileNames
})
export default rootReducer; 