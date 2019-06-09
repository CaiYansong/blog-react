import React from 'react';
import { NavLink } from "react-router-dom";
import '../sass/nav.scss';

class Nav extends React.Component {
	render() {
		return <div className="header">
			<NavLink className="logo-box" to="/" exact><img className="logo" src="assets/dog_128px.png" alt="logo" title="logo" /></NavLink>
			<nav>
				<NavLink activeStyle={{ color: "#222", backgroundColor: "#fff" }} to="/" exact>首页</NavLink>
				<NavLink activeStyle={{ color: "#222", backgroundColor: "#fff" }} to="/articleList" exact>文章</NavLink>
				<NavLink activeStyle={{ color: "#222", backgroundColor: "#fff" }} to="/message" exact>留言</NavLink>
			</nav>

			{this.checkToken() ? "" : <NavLink className="login" to="/login" exact>登录</NavLink>}
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