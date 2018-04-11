import axios from 'axios';
import {
	ADD_ORDER_ITEM_TO_CART,
	REMOVE_ORDER_ITEM_FROM_CART,
	INCREMENT_ORDER_ITEM_COUNT,
	DECREMENT_ORDER_ITEM_COUNT,
	SUBMIT_ORDER_REQUEST,
	SUBMIT_ORDER_SUCCESS,
	SUBMIT_ORDER_FAILURE,
	CLEAR_CART
} from './types';
import { BASE_API_URL } from '../constants';

let nextOrderItemId = 1;

export const addOrderItemToCart = menuItem => ({
	type: ADD_ORDER_ITEM_TO_CART,
	id: nextOrderItemId++,
	product: menuItem.product,
	qty: 1
});

export const removeOrderItemFromCart = orderItem => ({
	type: REMOVE_ORDER_ITEM_FROM_CART,
	id: orderItem.id
});

export const incrementOrderItemCount = orderItem => ({
	type: INCREMENT_ORDER_ITEM_COUNT,
	id: orderItem.id,
	qty: orderItem.qty + 1
});

export const decrementOrderItemCount = orderItem => ({
	type: DECREMENT_ORDER_ITEM_COUNT,
	id: orderItem.id,
	qty: orderItem.qty - 1
});

const submitOrderRequest = (items, message) => ({
	type: SUBMIT_ORDER_REQUEST,
	items: items,
	message: message
});

const clearCart = () => ({
	type: CLEAR_CART
});

const submitOrderSuccess = order => ({
	type: SUBMIT_ORDER_SUCCESS,
	order
});
const submitOrderFailure = message => ({
	type: SUBMIT_ORDER_FAILURE,
	message
});

export const submitOrder = (
	items,
	shippingAddress,
	message
) => async dispatch => {
	dispatch(submitOrderRequest(items, shippingAddress, message));
	const response = await axios.post(`${BASE_API_URL}/orders`, {
		items,
		message,
		shippingAddress,
		createdAt: new Date()
	});
	const body = response.data;
	if (body.status === 'success') {
		dispatch(clearCart());
		dispatch(submitOrderSuccess(body.data));
	} else {
		dispatch(submitOrderFailure(body.message));
	}
};
