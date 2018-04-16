import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import menuReducer from './menu.reducer';
import checkoutReducer from './checkout.reducer';
import orderReducer from './order.reducer';
import orderItemsReducer from './orderItems.reducer';

export default combineReducers({
	authentication: authReducer,
	todaysMenu: menuReducer,
	orders: orderReducer,
	checkout: checkoutReducer,
	orderItems: orderItemsReducer
});
