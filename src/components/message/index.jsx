import React from 'react';
import CommentOn from "./CommentOn";
import TakeComment from "./TakeComment";
import "../../sass/message.scss";

class Message extends React.Component {
	render() {
		return <div className="message">
			<TakeComment></TakeComment>
			<CommentOn></CommentOn>
		</div>
	}
}
export default Message;