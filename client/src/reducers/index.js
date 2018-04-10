import { combineReducers } from 'redux';
import authReducer from './authReducer';
import menuReducer from './menuReducer';

export default combineReducers({
	authenticatedUser: authReducer,
	todaysMenu: menuReducer
});
