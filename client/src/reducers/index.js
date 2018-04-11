import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import menuReducer from './menu.reducer';
import checkoutReducer from './checkout.reducer';
import orderItemsReducer from './orderItems.reducer';

export default combineReducers({
	authentication: authReducer,
	todaysMenu: menuReducer,
	checkout: checkoutReducer,
	orderItems: orderItemsReducer
});
