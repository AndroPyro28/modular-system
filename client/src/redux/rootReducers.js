import authReducer from './reducers/authReducer.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    authReducer
})

export default allReducers;