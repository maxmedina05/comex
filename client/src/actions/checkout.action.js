import {
	ADD_ORDER_ITEM_TO_CART,
	REMOVE_ORDER_ITEM_FROM_CART,
	INCREMENT_ORDER_ITEM_COUNT,
	DECREMENT_ORDER_ITEM_COUNT
} from './types';

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
