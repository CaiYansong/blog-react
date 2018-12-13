import {
	combineReducers
} from "redux"
import article from './article';
import message from './message';

export default combineReducers({
	article,
	message
})