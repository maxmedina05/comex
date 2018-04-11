import {
	SUBMIT_ORDER_REQUEST,
	SUBMIT_ORDER_SUCCESS,
	SUBMIT_ORDER_FAILURE
} from '../actions/types';

export default function(
	state = {
		isSubmitting: false,
		hasErrors: false,
		order: null
	},
	action
) {
	switch (action.type) {
		case SUBMIT_ORDER_REQUEST:
			return Object.assign({}, state, { isSubmitting: true, hasErrors: false });
		case SUBMIT_ORDER_SUCCESS:
			return Object.assign({}, state, {
				isSubmitting: false,
				hasErrors: false,
				order: action.order,
				createdAt: action.createdAt
			});
		case SUBMIT_ORDER_FAILURE:
			return Object.assign({}, state, { isSubmitting: false, hasErrors: true });
		default:
			return state;
	}
}
