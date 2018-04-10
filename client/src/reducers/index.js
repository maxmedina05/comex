import { combineReducers } from 'redux';
import authReducer from './authReducer';
import menuReducer from './menuReducer';
import orderItemsReducer from './orderItems.reducer';

export default combineReducers({
	authenticatedUser: authReducer,
	todaysMenu: menuReducer,
	orderItems: orderItemsReducer
});
