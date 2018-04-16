import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';
import { fetchFailure } from './general.action';
import {
	FETCH_ORDERS_REQUEST,
	FETCH_ORDERS_SUCCESS,
	FETCH_ONE_ORDER_REQUEST,
	FETCH_ONE_ORDER_SUCCESS
} from '../constants/types';

function fetchOrdersRequest(userId) {
	return {
		type: FETCH_ORDERS_REQUEST,
		userId
	};
}
export function fetchOrdersSuccess(orders) {
	return {
		type: FETCH_ORDERS_SUCCESS,
		orders
	};
}

export const fetchOrders = userId => async dispatch => {
	dispatch(fetchOrdersRequest());
	try {
		const response = await axios.get(`${BASE_API_URL}/orders?userId=${userId}`);
		dispatch(fetchOrdersSuccess(response.data.payload));
	} catch (err) {
		const response = err.response.data;
		dispatch(fetchFailure(response.error));
	}
};

function fetchOneOrderRequest(orderId) {
	return {
		type: FETCH_ONE_ORDER_REQUEST,
		orderId
	};
}

export function fetchOneOrderSuccess(order) {
	return {
		type: FETCH_ONE_ORDER_SUCCESS,
		order
	};
}

export const fetchOneOrder = (orderId, history) => async dispatch => {
	dispatch(fetchOneOrderRequest());
	try {
		const response = await axios.get(`${BASE_API_URL}/orders/${orderId}`);
		dispatch(fetchOneOrderSuccess(response.data.payload));
		history.push(`/orders/${orderId}/confirmation`);
	} catch (err) {
		const response = err.response.data;
		dispatch(fetchFailure(response.error));
	}
};
