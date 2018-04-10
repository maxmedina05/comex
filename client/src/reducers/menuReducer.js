import {
	FETCH_TODAY_MENU_REQUEST,
	FETCH_TODAY_MENU_FAILURE,
	FETCH_TODAY_MENU_SUCCESS
} from '../actions/types';

export default function(
	state = {
		isFetching: false,
		hasErrors: false,
		menu: null
	},
	action
) {
	switch (action.type) {
		case FETCH_TODAY_MENU_REQUEST:
			return Object.assign({}, state, { isFetching: true, hasErrors: false });
		case FETCH_TODAY_MENU_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				hasErrors: false,
				menu: action.menu,
				lastUpdated: action.receivedAt
			});
		case FETCH_TODAY_MENU_FAILURE:
			return Object.assign({}, state, { isFetching: false, hasErrors: true });
		default:
			return state;
	}
}
