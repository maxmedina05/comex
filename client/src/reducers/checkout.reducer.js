import {
	SUBMIT_ORDER_REQUEST,
	SUBMIT_ORDER_SUCCESS,
	SUBMIT_ORDER_FAILURE
} from '../constants/types';

export default function(
	state = {
		isLoading: false,
		error: false,
		order: null
	},
	action
) {
	switch (action.type) {
		case SUBMIT_ORDER_REQUEST:
			return Object.assign({}, state, {
				order: null,
				isLoading: true,
				error: false
			});
		case SUBMIT_ORDER_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				error: false,
				order: action.order,
				createdAt: action.createdAt
			});
		case SUBMIT_ORDER_FAILURE:
			return Object.assign({}, state, {
				order: null,
				isLoading: false,
				error: action.error
			});
		default:
			return state;
	}
}
