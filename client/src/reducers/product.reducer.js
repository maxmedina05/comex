import * as types from '../constants/types';

export default function(
	state = {
		isLoading: false,
		error: false,
		items: [],
		product: null
	},
	action
) {
	switch (action.type) {
		case types.FETCH_PRODUCTS_REQUEST:
			return Object.assing({}, state, { isLoading: true, error: false });
		case types.FETCH_PRODUCTS_SUCCESS:
			return Object.assing({}, state, {
				items: action.products,
				isLoading: false,
				error: false
			});
		case types.FETCH_PRODUCTS_FAILURE:
			return Object.assing({}, state, {
				items: [],
				isLoading: false,
				error: action.error
			});
		default:
			state;
	}
}
