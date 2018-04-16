import { FETCH_FAILURE } from '../constants/types';

export function fetchFailure(error) {
	return {
		type: FETCH_FAILURE,
		error: error
	};
}
