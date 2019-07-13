import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from "axios";

import actionCreators from "../../store/actionCreator";

import './index.scss';

class TakeComment extends React.Component {
	addMessage = () => {
		if (!this.refs.content.value) {
			alert("内容不能为空");
			return 0;
		}
		this.postMessage(this.refs.content.value);
	}

	postMessage(content) {
		axios.post("/messageItem", {
			content
		}).then(data => {
			if (data.ok === 1) {
				this.props.getMessage();
				this.refs.content.value = '';
			} else {
				alert(data.msg);
			}
		});
	}

	render() {
		return <div className="message-add">
			<textarea name="textarea" className="message-edit" ref="content"></textarea>
			<div className="message-save-wrap">
				<input type="button" className="message-save" value="留言" onClick={this.addMessage} />
			</div>
		</div>
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, dispatch => bindActionCreators(actionCreators, dispatch))(TakeComment);