import {
	ADD_ORDER_ITEM_TO_CART,
	REMOVE_ORDER_ITEM_FROM_CART,
	INCREMENT_ORDER_ITEM_COUNT,
	DECREMENT_ORDER_ITEM_COUNT
} from '../actions/types';

function handleAddOrderItemToCart(state, action) {
	const existingItem = state.find(x => x.product._id === action.product._id);
	if (existingItem) {
		return [
			...state.filter(x => x.product._id !== action.product._id),
			{ ...existingItem, qty: existingItem.qty + 1 }
		];
	}
	return [
		...state,
		{
			id: action.id,
			product: action.product,
			qty: action.qty
		}
	];
}

function handleRemoveOrderItemFromCart(state, action) {
	return state.filter(x => action.id !== x.id);
}

function handleIncrementOrderItemCount(state, action) {
	const existingItem = state.find(x => x.id === action.id);
	if (existingItem.qty > 9) return state;
	return [
		...state.filter(x => x.id !== action.id),
		{ ...existingItem, qty: existingItem.qty + 1 }
	];
}

function handleDecrementOrderItemCount(state, action) {
	const existingItem = state.find(x => x.id === action.id);
	if (existingItem.qty - 1 <= 0) {
		return handleRemoveOrderItemFromCart(state, action);
	}

	return [
		...state.filter(x => x.id !== action.id),
		{ ...existingItem, qty: existingItem.qty - 1 }
	];
}

export default function(state = [], action) {
	console.log(action);
	switch (action.type) {
		case ADD_ORDER_ITEM_TO_CART:
			return handleAddOrderItemToCart(state, action);
		case REMOVE_ORDER_ITEM_FROM_CART:
			return handleRemoveOrderItemFromCart(state, action);
		case INCREMENT_ORDER_ITEM_COUNT:
			return handleIncrementOrderItemCount(state, action);
		case DECREMENT_ORDER_ITEM_COUNT:
			return handleDecrementOrderItemCount(state, action);
		default:
			return state;
	}
}
