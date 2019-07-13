import React from 'react';
import MessageAdd from "../../components/message-add";
import MessageList from "../../components/message-list";

import "./index.scss";

class Message extends React.Component {
	render() {
		return <div className="message">
			<MessageAdd />
			<MessageList />
		</div>
	}
}
export default Message;