const mongodb = require('mongodb');
const common = require('../modules/common');
const db = require('../modules/db');
const {
	checkToken
} = require('../modules/checkToken');
const {
	upImg
} = require('../modules/upImg');

const articleColl = "articleList";

//添加文章
module.exports.post = (req, res) => {
	// articlePic 图片标识：#-Date.now()-#
	if (checkToken(req, res)) {
		return 0;
	}
	upImg(req, 'articlePic', obj => {
		if (obj.ok === 3) { //未添加图片
			var data = {
				typeId: mongodb.ObjectId(obj.params.typeId),
				title: obj.params.title,
				content: obj.params.content,
				createTime: common.getNowTime(),
				isShow: true,
				isPrivate: false
			}
			if (obj.params.isPrivate === "true") {
				data.isPrivate = true;
			}
			db.insertOne(articleColl, data, err => {
				common.send(res, err, "添加成功");
			});
		} else if (obj.ok === 1) { //添加了图片

		} else {
			common.end(res, 2, obj.msg);
		}
	});
};
//获取普通文章列表
module.exports.getList = (req, res) => {
	var where = {
		isShow: true,
		isPrivate: false
	};
	if (req.query.typeId) {
		where.typeId = mongodb.ObjectId(req.query.typeId);
	}
	if (req.query.keyword) {
		where.title = new RegExp(req.query.keyword);
	}
	console.log(where);
	db.count(articleColl, where, (err, count) => {
		if (err) {
			common.end(res);
		} else {
			var pageNum = 5;
			var pageIndex = (req.query.pageIndex || 1) / 1;
			var pageSum = Math.ceil(count / pageNum);
			if (pageSum < 1) {
				pageSum = 1;
			}
			if (pageIndex < 1) {
				pageIndex = 1;
			}
			if (pageIndex > pageSum) {
				pageIndex = pageSum;
			}
			if (count === 0) {
				res.send({
					ok: 1,
					articleList: [],
					pageIndex,
					pageSum
				});
				return 0;
			}
			db.getArticleList(where, (pageIndex - 1) * pageNum, pageNum, (err, articleList) => {
				common.send(res, err, {
					articleList,
					pageIndex,
					pageSum
				});
			});
		}
	});
};
//获取普通文章
module.exports.get = (req, res) => {
	db.getArticle(req.query._id, (err, item) => {
		common.send(res, err, {
			item: item[0]
		});
	});
}
//获取私有文章列表
module.exports.getMyList = (req, res) => {
	if (checkToken(req, res)) {
		return 0;
	}
	var where = {
		isShow: true,
		isPrivate: true
	};
	if (req.query.typeId) {
		where.typeId = mongodb.ObjectId(req.query.typeId);
	}
	if (req.query.keyword) {
		where.title = new RegExp(req.query.keyword);
	}
	db.count(articleColl, where, (err, count) => {
		if (err) {
			common.end(res);
		} else {
			var pageNum = 5;
			var pageIndex = (req.query.pageIndex || 1) / 1;
			var pageSum = Math.ceil(count / pageNum);
			if (pageSum < 1) {
				pageSum = 1;
			}
			if (pageIndex < 1) {
				pageIndex = 1;
			}
			if (pageIndex > pageSum) {
				pageIndex = pageSum;
			}
			if (count === 0) {
				res.send({
					ok: 1,
					articleList: [],
					pageIndex,
					pageSum
				});
				return 0;
			}
			db.getArticleList(where, (pageIndex - 1) * pageNum, pageNum, (err, articleList) => {
				common.send(res, err, {
					articleList
				});
			});
		}
	});
};
//获取私有文章
module.exports.getMy = (req, res) => {
	if (checkToken(req, res)) {
		return 0;
	}
	db.findById(articleColl, req.query._id, (err, item) => {
		common.send(res, err, {
			item
		});
	});
}
//删除文章
module.exports.delete = (req, res) => {
	if (checkToken(req, res)) {
		return 0;
	}
	var _id = req.query._id;
	db.findById(articleColl, _id, (err, item) => {
		if (err) {
			common.end(res);
		} else {
			console.log(typeof item)
			if (item) {
				if (item.isShow) {
					db.updateOne(articleColl, _id, {
						$set: {
							isShow: false
						}
					}, err => {
						common.send(res, err, "删除成功");
					})
				} else {
					common.end(res, 1, '文章不存在1');
				}
			} else {
				common.end(res, 1, '文章不存在2');
			}
		}
	});
};
//编辑文章
module.exports.put = (req, res) => {
	if (checkToken(req, res)) {
		return 0;
	}
	upImg(req, 'articlePic', obj => {
		if (obj.ok === 2) {
			common.end(res);
		} else {
			var _id = obj.params._id;
			var update = {
				$set: {
					typeId: obj.params.typeId,
					title: obj.params.title,
					content: obj.params.content,
					isPrivate: obj.params.isPrivate
				}
			};
			if (obj.ok === 3) { //未上传图片
				db.updateOne(articleColl, _id, update, err => {
					common.send(res, err, "修改成功");
				})
			} else if (obj.ok === 1) { //上传了图片
				db.findById(articleColl, _id, (err, item) => {
					// fs.unlink(PATH)
				});
			}
		}
	});
};