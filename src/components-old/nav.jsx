import React from 'react';
import { NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';
import '../sass/nav.scss';

const { Sider } = Layout;

class Nav extends React.Component {
	render() {
		return <div className="header">
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={broken => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<NavLink className="logo" to="/" exact><img className="logo-img" src="assets/dog_128px.png" alt="logo" title="logo" /></NavLink>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
					<Menu.Item key="1">
						<NavLink to="/" exact>首页</NavLink>
					</Menu.Item>
					<Menu.Item key="2">
						<NavLink to="/articleList" exact>文章</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/message" exact>留言</NavLink>
					</Menu.Item>
					{
						this.checkToken() ? "" :
							<Menu.Item key="4">
								<span><NavLink className="login" to="/login" exact>登录</NavLink></span>
							</Menu.Item>
					}
				</Menu>
			</Sider>
		</div>
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
}
export default Nav;