import article from '../actionType/articleActionType';
import initState from '../state/article';
export default function (state = initState, action) {
	var newState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case article.GET_ARTICLE_TYPE:
			newState.articleTypeList = action.articleTypeList;
			break;
		case article.GET_ARTICLE:
			newState.articleList = action.payload.articleList;
			newState.pageIndex = action.payload.pageIndex;
			newState.pageSum = action.payload.pageSum;
			break;
		default:
			break;
	}
	return newState;
}