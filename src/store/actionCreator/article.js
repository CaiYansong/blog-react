import type from "../actionType/articleActionType";
import axios from "axios";


export default {
	checkTypeBack(data) {
		if (data.ok === 1) {
			this.getArticleType();
		} else {
			alert(data.msg);
		}
	},
	checkListBack(data) {
		if (data.ok === 1) {
			this.getArticleList();
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
				dispatch({
					type: type.GET_ARTICLE_TYPE,
					articleTypeList: data.articleTypeList
				});
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
	},
	//-----文章-----
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
							pageSum: data.pageSum
						}
					});
			});
		}
	},
	getMyArticleList(pageIndex = 1, typeId = "", keyword = "") {
		return (dispatch, getState) => {
			axios.get("/myArticleList", {
				params: {
					pageIndex,
					keyword,
					typeId
				}
			}).then(data => {
				if (data.ok === 1)
					dispatch({
						type: type.GET_ARTICLE,
						articleList: data.articleList,
						pageIndex: data.pageIndex,
						pageSum: data.pageSum
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