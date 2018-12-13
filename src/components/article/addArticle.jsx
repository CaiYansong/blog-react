import React from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from '../../store/actionCreator';
import "../../sass/addArticle.scss";

class AddArticle extends React.Component {
	handleEvent = () => {
		var event = this.props.match.params.type;
		this.refs.cancel.addEventListener(event, () => { this.props.history.go(-1) });
		this.refs.commit.addEventListener(event, this.commit);
	}
	commit = () => {
		var form = this.refs.form;
		var formData = new FormData(form);
		if (!formData.get("title")) {
			alert("请输入标题");
			return 0;
		}
		if (!formData.get("content")) {
			alert("请输入内容");
			return 0;
		}
		if (!formData.get("typeId")) {
			alert("请选择类型");
			return 0;
		}
		axios.post('/article', formData).then(data => {
			if (data.ok === 1) {
				this.props.getArticleList(1);
				this.props.history.go(-1);
			} else {
				alert(data.msg);
			}
		});
	}
	componentDidMount() {
		this.handleEvent();
		if (this.props.articleTypeList.length === 0) {
			this.props.getArticleType();
		}
	}
	render() {
		var typeList = this.props.articleTypeList;
		return <form action="" ref="form" className="addArticle">
			<h3>添加文章</h3>
			<input type="text" placeholder="文章标题" name="title" autoFocus/>
			<textarea placeholder="内容" name="content" ></textarea>
			<div className="choice">
				<select name="typeId">
					{typeList.map(v => <option key={v._id} value={v._id}>{v.typeName}</option>)}
				</select>
				<div>
					<span>隐私文章 ：</span>
					<input type="radio" name="isPrivate" id="isPrivate" value="true" />
					<label htmlFor="isPrivate">是</label>
					<input type="radio" name="isPrivate" id="noPrivate" value="false" defaultChecked />
					<label htmlFor="noPrivate" >否</label>
				</div>
			</div>
			<div>
				<span className="btn" ref="cancel">取消</span>
				<span className="btn" ref="commit">添加</span>
			</div>
		</form>
	}
}

function mapSTP(state) {
	return {
		articleTypeList: state.article.articleTypeList,
		clientType: state.index.clientType
	};
}
export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(AddArticle);