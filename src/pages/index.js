import React from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { Layout } from 'antd';

import Nav from '../components/nav';

import Home from './home';
import AddArticle from './add-article';
import ArticleList from './article';
import Article from './article';
import Message from './message';
import Login from './login';

import "./index.scss";

const { Content, Footer } = Layout;

export default withRouter(class Index extends React.Component {
	render() {
		return <Router>
			<Layout className="index" style={{ textAlign: "center" }}>
				<Nav />
				<Layout>
					<Content className="main">
						<Switch>
							<Route path="/" component={Home} exact></Route>
							<Route path="/articleList" component={ArticleList} ></Route>
							<Route path="/message" component={Message} ></Route>
							<Route path="/login" component={Login} ></Route>
							<Route path="/addArticle/:typeId" component={AddArticle} ></Route>
							<Route path="/articlePage/:id" component={Article} ></Route>
						</Switch>
					</Content>
					{/* <Footer style={{ textAlign: 'center' }}>My Home ©2018 Created by CaiYansong</Footer> */}
				</Layout>
			</Layout>
		</Router>
	}
})

