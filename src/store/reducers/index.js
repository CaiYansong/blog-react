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
		return state;
	}
})