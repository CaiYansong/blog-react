import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'antd';

import actionCreators from "../../store/actionCreator";
import './index.scss';

class CommentOn extends React.Component {
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
	componentDidMount() {
		this.props.getMessage(1);
	}
	render() {
		const { messageList, pageIndex, total, getMessage } = this.props;
		return <div className="msg-list-wrap">
			{messageList.length !== 0 ? "" : <div className="no-message">暂无留言</div>}
			<ul className="msg-list">
				{
					messageList.map(v => {
						return <li className="msg-item" key={v._id}>
							<p className="msg-content">{v.content}</p>
							<p className="msg-other">
								<span className="msg-create-time">{this.getDateTime(v.createTime)}</span>
							</p>
						</li>
					})}
			</ul>
			<Pagination
				showQuickJumper
				current={pageIndex}
				pageSize={5}
				total={total}
				onChange={getMessage}
			/>
		</div>
	}
}

function mapSTP(state) {
	return {
		messageList: state.message.messageList,
		pageIndex: state.message.pageIndex,
		total: state.message.total
	};
}


export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(CommentOn);