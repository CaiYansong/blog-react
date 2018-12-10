const mongodb = require('mongodb');
const common = require('./modules/common');
const db = require('./modules/db');
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
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	upImg(req, 'articlePic', obj => {
		if (obj.ok === 3) { //未添加图片
			db.insertOne(articleColl, {
				typeId: mongodb.ObjectId(obj.params.typeId),
				title: obj.params.title,
				content: obj.params.content,
				createTime: common.getNowTime(),
				isShow: true,
				isPrivate: obj.params.isPrivate
			}, err => {
				common.send(res, err, "添加成功");
			});
		} else if (obj.ok === 1) { //添加了图片

		} else {
			common.end(res, 2, obj.msg);
		}
	});
};
//获取普通文章
module.exports.get = (req, res) => {
	var where = {
		isShow: true,
		isHide: false
	};
	if (req.query.isPrivate) {
		where.isPrivate = true;
	}
	if (req.query.typeId) {
		where.typeId = mongodb.ObjectId(req.query.typeId);
	}
	db.count(articleColl, where, (err, count) => {
		if (err) {
			common.end(res);
		} else {
			var pageSum = Math.ceil(count / pageNum);
			var pageIndex = req.query.pageIndex;
			var pageNum = 2;
			if (pageSum < 1) {
				pageSum = 1;
			}
			if (pageIndex < 1) {
				pageIndex = 1;
			}
			if (pageIndex > pageSum) {
				pageIndex = pageSum;
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
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	var where = {
		isShow: true,
		isHide: true
	};
	if (req.query.isPrivate) {
		where.isPrivate = true;
	}
	if (req.query.typeId) {
		where.typeId = mongodb.ObjectId(req.query.typeId);
	}
	db.count(articleColl, where, (err, count) => {
		if (err) {
			common.end(res);
		} else {
			var pageSum = Math.ceil(count / pageNum);
			var pageIndex = req.query.pageIndex;
			var pageNum = 2;
			if (pageSum < 1) {
				pageSum = 1;
			}
			if (pageIndex < 1) {
				pageIndex = 1;
			}
			if (pageIndex > pageSum) {
				pageIndex = pageSum;
			}
			db.getArticleList(where, (pageIndex - 1) * pageNum, pageNum, (err, articleList) => {
				common.send(res, err, {
					articleList
				});
			});
		}
	});
};
//删除文章
module.exports.delete = (req, res) => {
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	var _id = req.query._id;
	db.findById(articleColl, _id, (err, item) => {
		if (err) {
			common.end(res);
		} else {
			if (item) {
				db.updateOne(articleColl, _id, {
					$set: {
						isShow: false
					}
				}, err => {
					common.send(res, err, "删除成功");
				})
			} else {
				common.end(res, 1, '文章不存在');
			}
		}
	});
};
//编辑文章
module.exports.put = (req, res) => {
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	var _id = req.body._id;
	upImg(req, 'articlePic', obj => {
		if (obj.ok === 2) {
			common.end(res);
		} else {
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