import type from "../actionType/articleActionType";
import axios from "axios";


export default {
	checkListBack(data) {
		if (data.ok === 1) {
			this.getArticleList();
		} else {
			alert(data.msg);
		}
	},
	addArticle(formData) {
		return (dispatch, getState) => {
			axios.post("/articleItem", formData).then(this.checkListBack);
		}
	},
	getArticleList(pageIndex = 1, typeId = "", keyword = "") {
		return (dispatch, getState) => {
			axios.get("/articleList", {
				params: {
					pageIndex,
					keyword,
					typeId
				}
			}).then(data => {
				if (data.ok === 1)
					dispatch({
						type: type.GET_ARTICLE,
						payload: {
							articleList: data.articleList,
							pageIndex: data.pageIndex,
							pageSum: data.pageSum,
							total: data.count
						}
					});
			});
		}
	},
	deleteArticle(_id) {
		return (dispatch, getState) => {
			axios.delete("/articleItem", {
				params: {
					_id
				}
			}).then(this.checkListBack.bind(this));
		}
	},
	editArticle(formData) {
		return (dispatch, getState) => {
			axios.put("/articleItem", formData).then(this.checkListBack.bind(this));
		}
	}
}