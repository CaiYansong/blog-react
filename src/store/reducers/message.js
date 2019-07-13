import initState from '../state/message';
import message from '../actionType/messageActionType';

export default function (state = initState, action) {
	var newState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case message.GET_MESSAGE:
			newState.messageList = action.messageList;
			newState.pageIndex = action.pageIndex;
			newState.pageSum = action.pageSum;
			newState.total = action.total;
			break;
		default:
			break;
	}
	return newState;
}