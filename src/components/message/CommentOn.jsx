import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from "../../store/actionCreator";
import axios from "axios";
import moment from "moment";


class CommentOn extends React.Component {
	deleteMessage = (_id) => {
		axios.delete("/message", {
			params: {
				_id
			}
		}).then(this.checkBack.bind(this));
	}
	editMessage = (_id, content) => {
		axios.put("/message", {
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
		var m = moment(time)
		return m.year() + "年" + m.month() + "月" + m.date() + "日 " + m.hour() + ":" + m.minute() + ":" + m.second()
	}
	handleChange = () => {
		var prve = this.refs.prve;
		var next = this.refs.next;
		var jump = this.refs.jump;
		if ("ontouchstart" in window) {
			prve.addEventListener("touchend", this.prve);
			next.addEventListener("touchend", this.next);
			jump.addEventListener("touchend", this.jump);
		} else {
			prve.addEventListener("click", this.prve);
			next.addEventListener("click", this.next);
			jump.addEventListener("click", this.jump);
		}
	}
	prve = () => {
		var num = this.props.pageIndex;
		if (this.props.pageIndex !== 1) {
			this.props.getMessage(--num);
		}
	}
	next = () => {
		var num = this.props.pageIndex;
		if (this.props.pageIndex !== this.props.pageSum) {
			this.props.getMessage(++num);
		}
	}
	jump = () => {
		var value = this.refs.page.value;
		console.log(value);
		if (value) {
			if (value <= 1) {
				if (this.props.pageIndex !== 1) {
					value = 1;
				} else {
					return 0;
				}
			} else if (value >= this.props.pageSum) {
				if (this.props.pageIndex !== this.props.pageSum) {
					value = this.props.pageSum;
				} else {
					return 0;
				}
			}
			this.props.getMessage(value);
		}
	}
	componentWillMount() {
		this.props.getMessage(1);
	}
	componentDidMount() {
		this.handleChange();
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
			<div className="page">
				<span className="prve" ref="prve">上一页</span>
				{this.props.pageIndex}/{this.props.pageSum}
				<span className="next" ref="next">下一页</span>
				<div className="jump"><input type="text" className="target" ref="page" /><span ref="jump">跳转</span></div>
			</div>
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