import {
	FETCH_ORDERS_REQUEST,
	FETCH_FAILURE,
	FETCH_ORDERS_SUCCESS,
	FETCH_ONE_ORDER_REQUEST,
	FETCH_ONE_ORDER_SUCCESS
} from '../constants/types';

export default function(
	state = {
		isLoading: false,
		error: false,
		items: [],
		order: null
	},
	action
) {
	switch (action.type) {
		case FETCH_ONE_ORDER_REQUEST:
		case FETCH_ORDERS_REQUEST:
			return Object.assign({}, state, { isLoading: true, error: null });
		case FETCH_ORDERS_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				error: false,
				items: action.orders
			});
		case FETCH_ONE_ORDER_SUCCESS:
			return Object.assign({}, state, {
				order: action.order,
				isLoading: false,
				error: null
			});
		case FETCH_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error
			});
		default:
			return state;
	}
}
