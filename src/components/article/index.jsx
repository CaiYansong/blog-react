import React from 'react';
import { Row, Col, Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from '../../store/actionCreator';

import "../../sass/article.scss";

class Article extends React.Component {
	constructor() {
		super();
		this.state = {
			isShowTools: true
		}
	}
	componentDidMount() {
		// ant-col-6
		var tool = this.refs.tool;
		if ("ontouchstart" in window) {
			this.setState({ isShowTools: false });
			tool.addEventListener('touchend', this.showTool);
			console.log('touchend');
		} else {
			tool.addEventListener('click', this.showTool);
			console.log('click')
		}
		this.props.getArticleList(1);
		this.props.getArticleType();
	}
	showTool = () => {
		var option_box = this.refs.option_box;
		var option = this.refs.option;
		option_box.style.display="clock";
		option.style.width = "100px";
	}
	render() {
		return <div className="article">
			<Row>
				<Col span={this.state.isShowTools ? 18 : 24}>
					<ul className="article-list">
						{this.props.articleList.map(v => {
							return <li key={v._id}>
								<h3 className="title">{v.title}【{v.typeInfo[0].typeName}】</h3>
								<p className="time">{v.createTime}</p>
								<p className="content">{v.content}</p>
							</li>
						})}
					</ul>
				</Col>
				<Col span={this.state.isShowTools ? 6 : 0} ref="option_box">
					<div className="option" ref="option">
						<div className="search">
							<Input placeholder="搜索" />
						</div>
						<div className="type">
							<h3>类型</h3>
							{this.props.articleTypeList.map(v => {
								return <div key={v._id}>
									<p>{v.typeName}</p>
								</div>
							})}
						</div>
					</div>
				</Col>
				<div className="tool" ref="tool">...</div>
			</Row>
		</div>
	}
}

function mapSTP(state) {
	console.log();
	return {
		articleList: state.article.articleList,
		articleTypeList: state.article.articleTypeList,
		pageIndex: state.article.pageIndex,
		pageSum: state.article.pageSum,
	};
}
export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(Article);