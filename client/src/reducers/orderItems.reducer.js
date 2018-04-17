import {
	ADD_ORDER_ITEM_TO_CART,
	REMOVE_ORDER_ITEM_FROM_CART,
	INCREMENT_ORDER_ITEM_COUNT,
	DECREMENT_ORDER_ITEM_COUNT,
	CLEAR_CART
} from '../constants/types';

const MAX_QUANTITY_IN_CART = 10;

function handleAddOrderItemToCart(state, action) {
	const existingItem = state.find(x => x.product._id === action.product._id);
	if (existingItem) {
		return handleIncrementOrderItemCount(state, {
			type: INCREMENT_ORDER_ITEM_COUNT,
			id: existingItem.id,
			quantity: existingItem.quantity + 1
		});
	}
	return [
		...state,
		{
			id: action.id,
			product: action.product,
			quantity: action.quantity,
			unitPrice: action.unitPrice,
			discount: action.discount
		}
	];
}

function handleRemoveOrderItemFromCart(state, action) {
	return state.filter(x => action.id !== x.id);
}

function handleIncrementOrderItemCount(state, action) {
	const existingItem = state.find(x => x.id === action.id);
	if (existingItem.quantity > MAX_QUANTITY_IN_CART) return state;

	return state.map(x => {
		if (x.id === action.id) {
			return { ...existingItem, quantity: existingItem.quantity + 1 };
		}
		return x;
	});
}

function handleDecrementOrderItemCount(state, action) {
	const existingItem = state.find(x => x.id === action.id);
	if (existingItem.quantity - 1 <= 0) {
		return handleRemoveOrderItemFromCart(state, action);
	}

	return [
		...state.map(x => {
			if (x.id === action.id) {
				return { ...existingItem, quantity: existingItem.quantity - 1 };
			}
			return x;
		})
	];
}

export default function(state = [], action) {
	switch (action.type) {
		case ADD_ORDER_ITEM_TO_CART:
			return handleAddOrderItemToCart(state, action);
		case REMOVE_ORDER_ITEM_FROM_CART:
			return handleRemoveOrderItemFromCart(state, action);
		case INCREMENT_ORDER_ITEM_COUNT:
			return handleIncrementOrderItemCount(state, action);
		case DECREMENT_ORDER_ITEM_COUNT:
			return handleDecrementOrderItemCount(state, action);
		case CLEAR_CART:
			return [];
		default:
			return state;
	}
}
