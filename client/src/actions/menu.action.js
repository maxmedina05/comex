import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';
import {
	FETCH_TODAY_MENU_REQUEST,
	FETCH_TODAY_MENU_FAILURE,
	FETCH_TODAY_MENU_SUCCESS
} from '../constants/types';

function fetchTodaysMenuRequest(date) {
	return {
		type: FETCH_TODAY_MENU_REQUEST,
		requestAt: date
	};
}

export const fetchTodaysMenu = () => async dispatch => {
	dispatch(fetchTodaysMenuRequest(new Date()));

	const res = await axios.get(`${BASE_API_URL}/menus/available`);
	const menu = res.data.data;
	dispatch(fetchTodaysMenuSuccess(menu));
};

export function fetchTodaysMenuFailure(value) {
	return {
		type: FETCH_TODAY_MENU_FAILURE,
		hasErrors: value
	};
}

export function fetchTodaysMenuSuccess(menu) {
	return {
		type: FETCH_TODAY_MENU_SUCCESS,
		menu,
		receivedAt: Date.now()
	};
}
