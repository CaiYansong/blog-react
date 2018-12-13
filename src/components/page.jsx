import React from 'react';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: "",
			typeId: ''
		}
		if (props.keyword) {
			this.setState({ keyword: props.keyword });
		}
		if (props.typeId) {
			this.setState({ typeId: props.typeId });
		}
	}
	componentDidMount() {
		this.handleChange();
	}
	handleChange = () => {
		var prve = this.refs.prve;
		var next = this.refs.next;
		var jump = this.refs.jump;
		if ("ontouchstart" in window) {
			prve.addEventListener("touchend", this.prve);
			next.addEventListener("touchend", this.next);
			jump.addEventListener("touchend", this.jump);
		} else {
			prve.addEventListener("click", this.prve);
			next.addEventListener("click", this.next);
			jump.addEventListener("click", this.jump);
		}
	}
	prve = () => {
		var num = this.props.pageIndex;
		if (this.props.pageIndex !== 1) {
			this.props.change(--num, this.state.typeId, this.state.keyword);
		}
	}
	next = () => {
		var num = this.props.pageIndex;
		if (this.props.pageIndex !== this.props.pageSum) {
			this.props.change(++num, this.state.typeId, this.state.keyword);
		}
	}
	jump = () => {
		var value = this.refs.page.value;
		if (value) {
			if (value <= 1) {
				if (this.props.pageIndex !== 1) {
					value = 1;
				} else {
					return 0;
				}
			} else if (value >= this.props.pageSum) {
				if (this.props.pageIndex !== this.props.pageSum) {
					value = this.props.pageSum;
				} else {
					return 0;
				}
			}
			this.props.change(value, this.state.typeId, this.state.keyword);
		}
	}
	render() {
		return <div className="page">
			<span className="prve" ref="prve">上一页</span>
			{this.props.pageIndex}/{this.props.pageSum}
			<span className="next" ref="next">下一页</span>
			<div className="jump"><input type="text" className="target" ref="page" /><span ref="jump">跳转</span></div>
		</div>
	}
}
export default Page;