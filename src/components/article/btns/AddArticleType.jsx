import React from 'react';
import axios from "axios";
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class AddArticleType extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false
		}
	}
	componentDidMount() {
		this.refs.add.addEventListener(this.props.clientType, this.showModal);
	}
	showModal = () => {
		if (this.check()) {
			this.setState({ visible: true });
		} else {
			alert("请先登录");
		}
	}
	check = () => {
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
	handleCancel = () => {
		this.setState({ visible: false });
	}
	handleCreate = () => {
		const form = this.form;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			axios.post("/articleType", {
				typeName: values.type
			}).then(data => {
				if (data.ok === 1) {
					this.props.getType();
				} else {
					alert(data.msg);
				}
			});
			form.resetFields();
			this.setState({ visible: false });
		});
	}
	saveFormRef = (form) => {
		this.form = form;
	}
	handleCurrencyChange = (currency) => {
		if (!('value' in this.props)) {
			this.setState({ currency });
		}
		this.triggerChange({ currency });
	}
	render() {
		return <div ref="add">
			<span style={{ margin: "5px 0" }}>添加类别</span>
			<CollectionCreateForm
				ref={this.saveFormRef}
				visible={this.state.visible}
				onCancel={this.handleCancel}
				onCreate={this.handleCreate}
			/>
		</div>
	}
}

export default AddArticleType;


const CollectionCreateForm = Form.create()(
	(props) => {
		const { visible, onCancel, onCreate, form } = props;
		const { getFieldDecorator } = form;
		return (
			<Modal
				visible={visible}
				title="文章类别"
				okText="提交"
				cancelText="取消"
				onCancel={onCancel}
				onOk={onCreate}
			>
				<Form layout="vertical">
					<FormItem label="文章类别">
						{getFieldDecorator('type', {
							rules: [{ required: true, message: '请输入文章类别' }],
						})(
							<Input />
						)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
);