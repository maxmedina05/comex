import axios from 'axios';
import { BASE_API_URL } from '../constants';
import {
	SUBMIT_LOGIN_REQUEST,
	SUBMIT_LOGIN_FAILURE,
	SUBMIT_LOGIN_SUCCESS
} from './types';

const submitLoginRequest = (email, password) => ({
	type: SUBMIT_LOGIN_REQUEST
});

export const submitLoginSuccess = user => ({
	type: SUBMIT_LOGIN_SUCCESS,
	payload: user
});

export const submitLoginFailure = error => ({
	type: SUBMIT_LOGIN_FAILURE,
	error
});

export const submitLogin = (email, password) => async dispatch => {
	dispatch(submitLoginRequest(email, password));
	try {
		const response = await axios.post(`${BASE_API_URL}/auth/login`, {
			email,
			password
		});
		const body = response.data;
		if (body.status === 'success') {
			dispatch(submitLoginSuccess(body.data));
		} else {
			dispatch(submitLoginFailure(body.message));
		}
	} catch (err) {
		dispatch(submitLoginFailure(err.message || err));
	}
};

// export const fetchUser = () => async dispatch => {
// 	const res = await axios.get(`${BASE_API_URL}/auth/user`);
// 	const body = res.data;
// 	dispatch({ type: FETCH_USER, payload: body.data });
// };
