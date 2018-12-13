import React from 'react';
import { Route, Switch } from "react-router-dom";

import Nav from "./nav";
import Home from "./home";
import Article from "./article";
import Message from "./message";
import login from "./login";

import "../sass/index.scss";

class Index extends React.Component {
	render() {
		return <div className="index" style={{ textAlign: "center" }}>
			<Nav></Nav>
			<div className="main">
				<Switch>
					<Route path="/" component={Home} exact></Route>
					<Route path="/article" component={Article} ></Route>
					<Route path="/message" component={Message} ></Route>
					<Route path="/login" component={login} ></Route>
				</Switch>
			</div>
		</div>
	}
}
export default Index;
