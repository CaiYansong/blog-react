import React from 'react';
import axios from "axios";
import { Popconfirm, message } from 'antd';

class Article extends React.Component {
	state = {
		item: {}
	}

	componentDidMount() {
		this.getItem(this.props.match.params.id);
	}

	getItem = (_id) => {
		axios.get('/articleItem', { params: { _id } }).then(data => {
			if (data.ok === 1) {
				this.setState({ item: data.item });
			} else {
				alert(data.msg);
			}
		});
	}

	confirm = (e) => {
		axios.delete('/articleItem', { params: { _id: this.props.match.params.id } }).then(data => {
			if (data.ok === 1) {
				this.props.history.push('/articleList');
				message.success('删除成功');
			} else {
				message.error("删除失败");
			}
		});
	}

	cancel(e) {
		message.error('取消删除');
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

	render() {
		var item = this.state.item;
		return <div className="articleRead">
			<h2 className="title">{item.title}</h2>
			<p className="time">{item.createTime}【{item.typeInfo ? item.typeInfo[0].typeName : ""}】</p>
			<div className="content" dangerouslySetInnerHTML={{ __html: item.content }} />
			<Popconfirm title="是否确定删除" onConfirm={this.confirm} onCancel={this.cancel} okText="删除" cancelText="取消" style={this.checkToken() ? '' : { display: 'none' }}>
				<div className="remove" ref="remove">删除</div>
			</Popconfirm>
		</div>
	}
}
export default Article;