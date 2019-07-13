import type from "../actionType/articleActionType";
import axios from "axios";


export default {
	changeType(typeId) {
		return (dispatch, getState) => {
			dispatch({
				type: type.CHANGE_TYPE,
				typeId
			});
		}
	},
	checkTypeBack(data) {
		if (data.ok === 1) {
			this.getArticleType();
		} else {
			alert(data.msg);
		}
	},
	addArticleType(typeName) {
		return (dispatch, getState) => {
			axios.post("/articleType", {
				typeName
			}).then(this.checkTypeBack.bind(this));
		}
	},
	getArticleType() {
		return (dispatch, getState) => {
			axios.get("/articleType").then(data => {
				if (data.ok === 1) {
					dispatch({
						type: type.GET_ARTICLE_TYPE,
						articleTypeList: data.articleTypeList
					});
				}
			});
		};
	},
	deleteArticleType(_id) {
		return (dispatch, getState) => {
			axios.delete("/articleType", {
				params: {
					_id
				}
			}).then(this.checkTypeBack.bind(this));
		};
	},
	editArticleType(_id, typeName) {
		return (dispatch, getState) => {
			axios.put("/articleType", {
				params: {
					_id,
					typeName
				}
			}).then(this.checkTypeBack.bind(this));
		};
	}
}