import axios from 'axios';
import { BASE_API_URL } from '../constants';
import {
	FETCH_USER,
	SUBMIT_LOGIN_REQUEST,
	SUBMIT_LOGIN_FAILURE,
	SUBMIT_LOGIN_SUCCESS,
	SUBMIT_REGISTER_REQUEST,
	SUBMIT_REGISTER_FAILURE,
	SUBMIT_REGISTER_SUCCESS
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
		console.log(err);
		if (err.response) {
			const message = err.response.data.message;
			dispatch(submitLoginFailure(message));
		} else {
			dispatch(submitLoginFailure(err));
		}
	}
};

const submitRegisterRequest = () => ({
	type: SUBMIT_REGISTER_REQUEST
});

export const submitRegister = registrationForm => async dispatch => {
	dispatch(submitRegisterRequest());
	try {
		const response = await axios.post(`${BASE_API_URL}/auth/signup`, {
			...registrationForm
		});
		const body = response.data;
		if (body.status === 'success') {
			dispatch(submitRegisterSuccess(body.data));
		} else {
			dispatch(submitRegisterFailure(body.message));
		}
	} catch (err) {
		if (err.response) {
			const message = err.response.data.message;
			dispatch(submitLoginFailure(message));
		} else {
			dispatch(submitLoginFailure(err));
		}
	}
};

export const submitRegisterSuccess = user => ({
	type: SUBMIT_REGISTER_SUCCESS,
	payload: user
});

export const submitRegisterFailure = error => ({
	type: SUBMIT_REGISTER_FAILURE,
	error
});

export const fetchUser = () => async dispatch => {
	const res = await axios.get(`${BASE_API_URL}/auth/user`);
	const body = res.data;
	dispatch({ type: FETCH_USER, payload: body.data });
};
