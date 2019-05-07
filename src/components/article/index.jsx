import React from 'react';
import { Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from '../../store/actionCreator';
import AddArticle from "./btns/addArticle";
import AddArticleType from "./btns/AddArticleType";
import Page from "../page";

import "../../sass/article.scss";

class Article extends React.Component {
	constructor() {
		super();
		this.state = {
			keyword: "",
			typeId: ''
		}
	}
	componentWillMount() {
		this.props.getArticleList(1);
		this.props.getArticleType();
	}
	componentDidMount() {
		if (this.refs.toolBtn) {
			this.refs.toolBtn.addEventListener(this.props.clientType, this.showTool);
		}
	}
	showTool = () => {
		var option = this.refs.option;
		if (option.style.display === "block") {
			option.style.display = "none";
		} else {
			option.style.display = "block";
		}
	}
	changeKeyword = (e) => {
		var keyword = e.target.value;
		this.setState({ keyword });
	}
	search = () => {
		this.props.getArticleList(1, "", this.state.keyword);
	}
	choiceType = (typeId) => {
		this.setState({ typeId });
		this.props.getArticleList(1, typeId, this.state.keyword);
	}
	checkToken() {
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
	/**
	 * 减少列表渲染的内容长度
	 */
	subArticleContent(str) {
		if (str.length > 120) {
			return str.substr(0, 120) + '...';
		} else {
			return str;
		}
	}
	render() {
		return <div className="article">
			<ul className="article-list">
				{this.props.articleList.map(v => {
					return <li key={v._id} data-id={v._id} onClick={() => { this.props.history.push("/articlePage/" + v._id); }}>
						<h3 className="title">{v.title}【{v.typeInfo[0].typeName}】</h3>
						<p className="time">{v.createTime}</p>
						<div style={{ maxHeight: '63px' }} className="content" dangerouslySetInnerHTML={{ __html: this.subArticleContent(v.content) }} />
					</li>
				})}
				{this.props.articleList.length !== 0 ? <Page
					change={this.props.getArticleList}
					pageIndex={this.props.pageIndex}
					pageSum={this.props.pageSum}
					keyword={this.state.keyword}
					typeId={this.state.typeId}
				></Page> : "没有文章"}
			</ul>
			<div className={this.props.clientType === "click" ? "option" : "phoneOption"} ref="option">
				{this.checkToken() ? "" : <span onClick={() => { this.props.history.push('/login') }}>登录</span>}
				<AddArticle history={this.props.history} clientType={this.props.clientType}></AddArticle>
				<div className="search">
					<Input placeholder="搜索" onBlur={this.search} onChange={this.changeKeyword} ref="search" />
				</div>
				<AddArticleType clientType={this.props.clientType} getType={this.props.getArticleType}></AddArticleType>
				<div className="type">
					<h3>类型</h3>
					<div onClick={() => { this.choiceType("") }} style={{ textAlign: "center" }}>全部</div>
					{this.props.articleTypeList.map(v => {
						return <div key={v._id}>
							<p className="typeItem">
								<span onClick={() => { this.choiceType(v._id) }}>{v.typeName}</span>
								{this.checkToken() ? <span onClick={() => { console.log(this.props.deleteArticleType(v._id)) }}>删除</span> : ""}
							</p>
						</div>
					})}
				</div>
			</div>
			<div className="toolBtn" style={this.props.clientType === "click" ? { display: "none" } : {}} ref="toolBtn">...</div>
		</div >
	}
}

function mapSTP(state) {
	return {
		articleList: state.article.articleList,
		articleTypeList: state.article.articleTypeList,
		pageIndex: state.article.pageIndex,
		pageSum: state.article.pageSum,
		clientType: state.index.clientType
	};
}
export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(Article);