import {
	FETCH_USER,
	SUBMIT_LOGIN_REQUEST,
	SUBMIT_LOGIN_FAILURE,
	SUBMIT_LOGIN_SUCCESS,
	SUBMIT_REGISTER_REQUEST,
	SUBMIT_REGISTER_FAILURE,
	SUBMIT_REGISTER_SUCCESS
} from '../actions/types';

export default function(
	state = {
		payload: null,
		redirectToReferrer: false,
		isLoading: false,
		hasErrors: false
	},
	action
) {
	switch (action.type) {
		case FETCH_USER:
			return {
				payload: action.payload || false,
				isLoading: false,
				hasErrors: false
			};
		case SUBMIT_REGISTER_REQUEST:
		case SUBMIT_LOGIN_REQUEST:
			return {
				payload: false,
				isLoading: true,
				hasErrors: false,
				redirectToReferrer: false
			};
		case SUBMIT_REGISTER_SUCCESS:
		case SUBMIT_LOGIN_SUCCESS:
			return {
				payload: action.payload,
				isLoading: false,
				hasErrors: false,
				redirectToReferrer: true
			};
		case SUBMIT_REGISTER_FAILURE:
		case SUBMIT_LOGIN_FAILURE:
			return {
				payload: false,
				isLoading: false,
				hasErrors: true,
				error: action.error,
				redirectToReferrer: false
			};
		default:
			return state;
	}
}