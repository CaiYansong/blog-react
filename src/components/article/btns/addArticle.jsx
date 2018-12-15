import React from 'react';

class Add extends React.Component {
	componentDidMount() {
		this.refs.add.addEventListener(this.props.clientType, this.add);
	}
	add = () => {
		if (this.check()) {
			this.props.history.push('/addArticle/' + this.props.clientType);
		}else{
			alert("请先登录");
		}
	}
	check = () => {
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
	render() {
		return <div style={{ textAlign: "center" }}>
			<span ref="add" style={{ margin: "2px 0" }}>添加文章</span>
		</div>
	}
}

export default Add;

