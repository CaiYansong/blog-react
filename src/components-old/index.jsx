import React from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { Layout } from 'antd';

import Nav from "./nav";
import Home from "./home";
import Article from "./article";
import Message from "./message";
import login from "./login";
import AddArticle from "./article/addArticle";
import articlePage from "./article/article";

import 'antd/dist/antd.css';
import "../sass/index.scss";

const { Content, Footer } = Layout;

export default withRouter(class Index extends React.Component {
	render() {
		return <Router>
			<Layout className="index" style={{ textAlign: "center" }}>
				<Nav></Nav>
				<Layout>
					<Content className="main">
						<Switch>
							<Route path="/" component={Home} exact></Route>
							<Route path="/articleList" component={Article} ></Route>
							<Route path="/message" component={Message} ></Route>
							<Route path="/login" component={login} ></Route>
							<Route path="/addArticle/:type" component={AddArticle} ></Route>
							<Route path="/articlePage/:id" component={articlePage} ></Route>
						</Switch>
					</Content>
					{/* <Footer style={{ textAlign: 'center' }}>My Home ©2018 Created by CaiYansong</Footer> */}
				</Layout>
			</Layout>
		</Router>
	}
})

