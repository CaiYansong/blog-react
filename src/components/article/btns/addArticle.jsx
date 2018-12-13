import React from 'react';
import check from '../../checkToken';

class Add extends React.Component {
	componentDidMount() {
		this.refs.add.addEventListener(this.props.clientType, this.add);
	}
	add = () => {
		this.props.history.push('/addArticle/' + this.props.clientType);
	}
	render() {
		return <div style={{ textAlign: "center" }}>
			<span ref="add" style={{ margin: "2px 0" }}>添加文章</span>
		</div>
	}
}

export default check(Add);

