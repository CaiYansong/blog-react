import type from "../actionType/messageActionType";
import axios from "axios";


export default {
	getMessage(pageIndex = 1) {
		return (dispatch, getState) => {
			axios.get("/messageList", {
				params: {
					pageIndex
				}
			}).then(data => {
				if (data.ok === 1)
					dispatch({
						type: type.GET_MESSAGE,
						messageList: data.messageList,
						pageIndex: data.pageIndex,
						pageSum: data.pageSum,
						total: data.count
					});
			});
		}
	}
}