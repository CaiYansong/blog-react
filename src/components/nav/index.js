import React from 'react';
import { NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from '../../store/actionCreator';

import './index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Nav extends React.Component {
	componentDidMount() {
		this.props.getArticleType();
	}


	choiceType = (typeId) => {
		this.props.changeType(typeId);
		this.props.getArticleList(1, typeId);
	}

	render() {
		const { articleTypeList = [] } = this.props;
		return <div className="header">
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
			>
				<NavLink className="logo" to="/" exact><img className="logo-img" src="assets/dog_128px.png" alt="logo" title="logo" /></NavLink>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} openKeys={['article']}>
					<Menu.Item key="home">
						<NavLink to="/" exact>首页</NavLink>
					</Menu.Item>
					<SubMenu key="article" title="文章" >
						<Menu.Item key="all" onClick={() => { this.choiceType('') }}>
							<NavLink to="/articleList" exact>所有文章</NavLink>
						</Menu.Item>
						{articleTypeList.map(v => <Menu.Item key={v._id} onClick={() => { this.choiceType(v._id) }}>
							<NavLink to={`/articleList/${v.typeName}`} exact>{v.typeName}</NavLink>
						</Menu.Item>
						)}
					</SubMenu>
					<Menu.Item key="message">
						<NavLink to="/message" exact>留言</NavLink>
					</Menu.Item>
					{
						this.checkToken() ? "" :
							<Menu.Item key="login">
								<NavLink className="login" to="/login" exact>登录</NavLink>
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

function mapSTP(state) {
	return {
		articleTypeList: state.article.articleTypeList
	};
}
export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(Nav);