import React, {
  Component
} from 'react';
import './App.css';
import Index from './components';
import {
  connect
} from "react-redux";
import {
  bindActionCreators
} from "redux";
import actionCreators from './store/actionCreator';

import {
} from "react-redux";


class App extends Component {
  componentWillMount() {
    if ("ontouchstart" in window) {
      this.props.changeClientType("touchend");
    }
  }
  render() {
    return    <Index /> ;
  }
}

function mapSTP(state) {
  return state;
}
export default connect(mapSTP, dispatch => bindActionCreators(actionCreators, dispatch))(App);