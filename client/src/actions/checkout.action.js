import axios from 'axios';
import { toast } from 'react-toastify';
import {
	ADD_ORDER_ITEM_TO_CART,
	REMOVE_ORDER_ITEM_FROM_CART,
	INCREMENT_ORDER_ITEM_COUNT,
	DECREMENT_ORDER_ITEM_COUNT,
	SUBMIT_ORDER_REQUEST,
	SUBMIT_ORDER_SUCCESS,
	SUBMIT_ORDER_FAILURE,
	CLEAR_CART
} from '../constants/types';
import { BASE_API_URL } from '../constants/constants';

let nextOrderItemId = 1;

export const addOrderItemToCart = menuItem => {
	toast.info(`Se agrego "${menuItem.product.name}" al carrito.`);

	return {
		type: ADD_ORDER_ITEM_TO_CART,
		id: nextOrderItemId++,
		product: menuItem.product,
		unitPrice: menuItem.product.price,
		discount: menuItem.discount,
		quantity: 1
	};
};

export const removeOrderItemFromCart = orderItem => ({
	type: REMOVE_ORDER_ITEM_FROM_CART,
	id: orderItem.id
});

export const incrementOrderItemCount = orderItem => ({
	type: INCREMENT_ORDER_ITEM_COUNT,
	id: orderItem.id,
	quantity: orderItem.quantity + 1
});

export const decrementOrderItemCount = orderItem => ({
	type: DECREMENT_ORDER_ITEM_COUNT,
	id: orderItem.id,
	quantity: orderItem.quantity - 1
});

const submitOrderRequest = preOrder => ({
	type: SUBMIT_ORDER_REQUEST,
	preOrder
});

const clearCart = () => ({
	type: CLEAR_CART
});

const submitOrderSuccess = order => ({
	type: SUBMIT_ORDER_SUCCESS,
	order
});
const submitOrderFailure = error => ({
	type: SUBMIT_ORDER_FAILURE,
	error
});

export const submitOrder = (preOrder, history) => async dispatch => {
	dispatch(submitOrderRequest(preOrder));
	try {
		const response = await axios.post(`${BASE_API_URL}/orders`, {
			items: preOrder.items,
			message: preOrder.message,
			shippingAddress: preOrder.address
		});
		dispatch(clearCart());
		dispatch(submitOrderSuccess(response.data.payload));
		history.push(`/orders/${response.data.payload.objectId}/confirmation`);
		toast.success('Su pedido ya fue creado!');
	} catch (err) {
		const response = err.response.data;
		dispatch(submitOrderFailure(response.error));
		toast.error('Hubo un error haciendo su pedido!');
	}
};
