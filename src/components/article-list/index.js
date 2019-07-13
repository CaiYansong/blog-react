import React from 'react';

import "./index.scss";

class ArticleList extends React.Component {
	/**
	 * 减少列表渲染的内容长度
	 */
	subArticleContent(str) {
		if (str.length > 120) {
			return str.substr(0, 120) + '...';
		} else {
			return str;
		}
	}

	render() {
		const { articleList, history } = this.props;
		return (<ul className="article-list">
			{articleList.map(v => {
				return <li className="article-item" key={v._id} data-id={v._id} onClick={() => { history.push("/articlePage/" + v._id); }}>
					<h3 className="title">{v.title}</h3>
					<p className="time">{v.createTime}【{v.typeInfo[0].typeName}】</p>
					<div style={{ maxHeight: '63px' }} className="content" dangerouslySetInnerHTML={{ __html: this.subArticleContent(v.content) }} />
				</li>
			})}
		</ul>);
	}
}

export default ArticleList;