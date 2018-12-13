import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from "../../store/actionCreator";
import axios from "axios";

class TakeComment extends React.Component {
	handleAdd = () => {
		var btn = this.refs.btn;
		if ("ontouchstart" in window) {
			btn.addEventListener("touchend", this.addMessage);
		} else {
			btn.addEventListener("click", this.addMessage);
		}
	}
	addMessage = () => {
		if (!this.refs.content.value) {
			alert("内容不能为空");
			return 0;
		}
		axios.post("/message", {
			content: this.refs.content.value
		}).then(data => {
			if (data.ok === 1) {
				this.props.getMessage(1);
				this.refs.content.value = "";
			} else {
				alert(data.msg);
			}
		});
	}
	componentDidMount() {
		this.handleAdd();
	}
	render() {
		return <div className="takeComment">
			<textarea name="textarea" className="takeTextField" ref="content"></textarea>
			<div className="takeSbmComment">
				<input type="button" className="inputs" value="留言" ref="btn" />
			</div>
		</div>
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, dispatch => bindActionCreators(actionCreators, dispatch))(TakeComment);