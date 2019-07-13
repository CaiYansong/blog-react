import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from "axios";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				axios.post('/login', { username: values.userName, password: values.password }).then(data => {
					if (data.ok === 1) {
						this.props.history.push("/");
					}
				});
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form style={{ marginTop: "16vh" }} onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" autoComplete="off" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" autoComplete="off" />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button" ref="btn"
						style={{ backgroundColor: "#333", borderColor: "#333" }}>
						Log in
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const Login = Form.create()(NormalLoginForm);

export default Login;

