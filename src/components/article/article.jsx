import React from 'react';
import axios from "axios";
import { Popconfirm, message } from 'antd';

class Article extends React.Component {
	constructor() {
		super();
		this.state = {
			item: {}
		}
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
	handleRemove = () => {

	}
	componentDidMount() {
		this.getItem(this.props.match.params.id);
		var event = "click"
		if ("ontouchstart" in window) {
			event = "touchend";
		}
		this.refs.remove.addEventListener(event, this.handleRemove);
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
	render() {
		var item = this.state.item;
		return <div className="articleRead">
			<h2 className="title">{item.title}【{item.typeInfo ? item.typeInfo[0].typeName : ""}】</h2>
			<p className="time">{item.createTime}</p>
			<div className="content" dangerouslySetInnerHTML={{__html: item.content}} />
			<Popconfirm title="是否确定删除" onConfirm={this.confirm} onCancel={this.cancel} okText="删除" cancelText="取消">
				<div className="remove" ref="remove">删除</div>
			</Popconfirm>
		</div>
	}
}
export default Article;