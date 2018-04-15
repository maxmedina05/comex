import axios from 'axios';
import { BASE_API_URL } from '../constants';
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
} from './types';

const fetchUserRequest = () => ({
	type: FETCH_USER_REQUEST
});

export const fetchUserSuccess = user => ({
	type: FETCH_USER_SUCCESS,
	payload: user
});

export const fetchUserFailure = error => ({
	type: FETCH_USER_FAILURE,
	error
});

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

export const submitRegisterSuccess = user => ({
	type: SUBMIT_REGISTER_SUCCESS,
	payload: user
});

export const submitRegisterFailure = error => ({
	type: SUBMIT_REGISTER_FAILURE,
	error
});

const submitRegisterRequest = () => ({
	type: SUBMIT_REGISTER_REQUEST
});

export const submitLogin = (email, password) => async dispatch => {
	dispatch(submitLoginRequest(email, password));
	try {
		const response = await axios.post(`${BASE_API_URL}/auth/login`, {
			email,
			password
		});
		dispatch(submitLoginSuccess(response.data.payload));
	} catch (err) {
		const response = err.response.data;
		dispatch(submitLoginFailure(response.error));
	}
};

export const submitRegister = registrationForm => async dispatch => {
	dispatch(submitRegisterRequest());
	try {
		const response = await axios.post(`${BASE_API_URL}/auth/signup`, {
			...registrationForm
		});
		dispatch(submitRegisterSuccess(response.data.payload));
	} catch (err) {
		const response = err.response.data;
		dispatch(submitRegisterFailure(response.error));
	}
};

export const fetchUser = () => async dispatch => {
	dispatch(fetchUserRequest());
	try {
		const response = await axios.get(`${BASE_API_URL}/auth/user`);
		dispatch(fetchUserSuccess(response.data.payload));
	} catch (err) {
		const response = err.response.data;
		dispatch(submitRegisterFailure(response.error));
	}
};
