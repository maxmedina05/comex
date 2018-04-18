import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';
import * as types from '../constants/types';

const requestProducts = () => ({
	type: types.FETCH_PRODUCTS_REQUEST
});

const receiveProducts = products => ({
	type: types.FETCH_PRODUCTS_SUCCESS,
	products
});

const requestFailure = error => ({
	type: types.FETCH_PRODUCTS_FAILURE,
	error
});

export const fetchProducts = () => async dispatch => {
	dispatch(requestProducts());
	try {
		const response = await axios.get(`${BASE_API_URL}/products`);
		dispatch(receiveProducts(response.data.payload));
	} catch (err) {
		const response = err.response.data;
		dispatch(requestFailure(response.error));
	}
};
