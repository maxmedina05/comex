import {
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
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
		isLoading: true,
		error: null
	},
	action
) {
	console.log(action);
	switch (action.type) {
		case FETCH_USER_REQUEST:
			return {
				payload: false,
				isLoading: true,
				error: null
			};
		case SUBMIT_REGISTER_REQUEST:
		case SUBMIT_LOGIN_REQUEST:
		case FETCH_USER_REQUEST:
			return {
				payload: false,
				isLoading: true,
				error: null,
				redirectToReferrer: false
			};
		case SUBMIT_REGISTER_SUCCESS:
		case SUBMIT_LOGIN_SUCCESS:
		case FETCH_USER_SUCCESS:
			return {
				payload: action.payload,
				isLoading: false,
				error: null,
				redirectToReferrer: true
			};
		case FETCH_USER_FAILURE:
		case SUBMIT_REGISTER_FAILURE:
		case SUBMIT_LOGIN_FAILURE:
			return {
				payload: false,
				isLoading: false,
				error: action.error,
				redirectToReferrer: false
			};
		default:
			return state;
	}
}
