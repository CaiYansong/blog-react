import React from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from '../../store/actionCreator';
import "../../sass/addArticle.scss";

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class AddArticle extends React.Component {
	state = {
		editorState: EditorState.createEmpty()
	}
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
		var editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

		formData.append("content", editorContent);

		if (!formData.get("typeId")) {
			alert("请选择类型");
			return 0;
		}
		axios.post('/articleItem', formData).then(data => {
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

		// tab按键不会切换到下面
		document.querySelector('.demo-editor').addEventListener('keydown', function (event) {
			var e = event || window.event;
			if (e && e.keyCode == 9) { // 按 tab 
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
			}
		});
	}

	onEditorStateChange = (editorState) => {
		this.setState({ editorState });
	}

	render() {
		var typeList = this.props.articleTypeList;
		return <form action="" ref="form" className="addArticle">
			<h3>添加文章</h3>
			<input type="text" placeholder="文章标题" name="title" autoFocus />
			<Editor
				editorState={this.state.editorState}
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				onEditorStateChange={this.onEditorStateChange}
			/>
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