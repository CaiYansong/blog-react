import React from 'react';
import { NavLink } from "react-router-dom";
import '../sass/nav.scss';

class Nav extends React.Component {
	render() {
		return <div className="header">
			<header>
				<nav>
					<NavLink activeStyle={{color:"#000",backgroundColor:"#fff"}} to="/" exact>首页</NavLink>
					<NavLink activeStyle={{color:"#000",backgroundColor:"#fff"}} to="/articleList" exact>文章</NavLink>
					<NavLink activeStyle={{color:"#000",backgroundColor:"#fff"}} to="/message" exact>留言</NavLink>
				</nav>
			</header>
		</div>
	}
}
export default Nav;