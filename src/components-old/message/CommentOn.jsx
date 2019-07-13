import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from "../../store/actionCreator";
import axios from "axios";
import Page from "../pagnation";


class CommentOn extends React.Component {
	deleteMessage = (_id) => {
		axios.delete("/messageItem", {
			params: {
				_id
			}
		}).then(this.checkBack.bind(this));
	}
	editMessage = (_id, content) => {
		axios.put("/messageItem", {
			_id,
			content
		}).then(this.checkBack.bind(this));
	}
	checkBack(data) {
		if (data.ok === 1) {
			this.getMessage();
		} else {
			alert(data.msg);
		}
	}
	getDateTime(time) {
		var m = new Date(time);
		return m.getFullYear() + "年" + (m.getMonth() + 1) + "月" + m.getDate() + "日 " + this.formattingTime(m.getHours()) + ":" + this.formattingTime(m.getMinutes()) + ":" + this.formattingTime(m.getSeconds());
	}
	/**
	 * 格式化时间
	 * 格式化为两位数
	 */
	formattingTime(time) {
		return time > 9 ? time : '0' + time;
	}
	componentWillMount() {
		this.props.getMessage(1);
	}
	render() {
		return <div className="commentOn">
			{this.props.messageList.length !== 0 ? "" : <div className="noContent">暂无留言</div>}
			<ul className="messList">
				{
					this.props.messageList.map(v => {
						return <li className="reply" key={v._id}>
							<p className="replyContent">{v.content}</p>
							<p className="operation">
								<span className="createTime">{this.getDateTime(v.createTime)}</span>
								{/* <span className="handle">
									<a href="false"
										onClick={(e) => { e.preventDefault(); return this.props.upWeibo(v._id, 1) }}
										className="top">{v.topNum}</a>
									<a href="false"
										onClick={(e) => { e.preventDefault(); return this.props.upWeibo(v._id, 2) }}
										className="down_icon">{v.downNum}</a>
									<a href="false"
										onClick={() => this.delItem(v._id)}
										className="cut">删除</a>
								</span> */}
							</p>
						</li>
					})}
			</ul>
			<Page change={this.props.getMessage} pageIndex={this.props.pageIndex} pageSum={this.props.pageSum}></Page>
		</div>
	}
}

function mapSTP(state) {
	return {
		messageList: state.message.messageList,
		pageIndex: state.message.pageIndex,
		pageSum: state.message.pageSum
	};
}


export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(CommentOn);