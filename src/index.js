import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import 'antd/dist/antd.css';

axios.interceptors.response.use(({
	data
}) => {
	return data;
});

ReactDOM.render(<Provider store={store}><Router>< Index /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();