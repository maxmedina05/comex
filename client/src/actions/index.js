import axios from 'axios';
import { BASE_API_URL } from '../constants';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get(`${BASE_API_URL}/auth/user`);
	const body = res.data;
	dispatch({ type: FETCH_USER, payload: body.data });
};
