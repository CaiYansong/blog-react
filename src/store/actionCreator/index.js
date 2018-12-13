import article from "./article";
import message from "./message";

export default {
	...article,
	...message,
	changeClientType(clientType = "click") {
		return (dispatch, getState) => {
			dispatch({
				type: "CHANGE_CLIENT_TYPE",
				clientType
			});
		}
	}
};