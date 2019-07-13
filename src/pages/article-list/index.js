import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Pagination } from "antd";
import actionCreators from '../../store/actionCreator';

import ArticleList from '../../components/article-list';

import "./index.scss";

class Article extends React.Component {
	constructor() {
		super();
		this.state = {
			keyword: ""
		}
	}

	componentDidMount() {
		this.props.getArticleList(1);
	}

	changeKeyword = (e) => {
		var keyword = e.target.value;
		this.setState({ keyword });
	}

	search = () => {
		const { getArticleList, typeId } = this.props;
		getArticleList(1, typeId, this.state.keyword);
	}

	onChange = (index) => {
		const { getArticleList, typeId } = this.props;
		getArticleList(index, typeId);
	}

	add = () => {
		if (this.check()) {
			const { typeId } = this.props;
			this.props.history.push('/addArticle/' + typeId);
		} else {
			alert("请先登录");
		}
	}

	check = () => {
		var token = "";
		var arr = document.cookie.split('; ');
		for (var i = 0; i < arr.length; i++) {
			var key = arr[i].split("=")[0];
			var value = arr[i].split("=")[1];
			if (key === "token") {
				token = value;
			}
		}
		return token ? true : false;
	}

	render() {
		const { articleList, pageIndex, total, history } = this.props;

		return <div className="article">
			<div className="article-option">
				<span onClick={this.add}>添加文章</span>
				<input type="text" />
				<button >搜索</button>
			</div>
			<ArticleList
				articleList={articleList}
				history={history}
			/>
			{articleList.length !== 0 ?
				<Pagination
					showQuickJumper
					current={pageIndex}
					pageSize={5}
					total={total}
					onChange={this.onChange}
				/>
				: "没有文章"}
		</div >
	}
}

function mapSTP(state) {
	return {
		articleList: state.article.articleList,
		articleTypeList: state.article.articleTypeList,
		pageIndex: state.article.pageIndex,
		total: state.article.total,
		clientType: state.index.clientType
	};
}
export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(Article);