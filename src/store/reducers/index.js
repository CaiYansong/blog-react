import {
	combineReducers
} from "redux"
import article from './article';
import message from './message';

import index from "../state";

export default combineReducers({
	article,
	message,
	index: (state = index, action) => {
		var newState = JSON.parse(JSON.stringify(state));
		switch (action.type) {
			case "CHANGE_CLIENT_TYPE":
				newState.clientType = action.clientType;
				break;
			default:
				break;
		}
		return newState;
	}
})