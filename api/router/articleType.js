const db = require('./modules/db');
const common = require('./modules/common');
const mongodb = require('mongodb');
const {
	checkToken
} = require('./modules/checkToken');

const articleTypeColl = "articleTypeList";
//添加
module.exports.post = (req, res) => {
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	var data = {
		typeName: req.body.typeName,
		isShow: true
	};
	db.findOne(articleTypeColl, data, (err, item) => {
		if (err) {
			common.end(res);
		} else {
			if (item) {
				common.end(res, 2, "类别已存在");
			} else {
				db.insertOne(articleTypeColl, data, err => {
					common.send(res, err, "添加文章类别成功");
				});
			}
		}
	});
}
//获取
module.exports.get = (req, res) => {
	db.find(articleTypeColl, {
		isShow: true
	}, (err, articleTypeList) => {
		common.send(res, err, {
			articleTypeList
		});
	})
}
//删除
module.exports.delete = (req, res) => {
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	var _id = req.query._id;
	db.find(articleTypeColl, {}, (err, list) => {
		if (err) {
			common.end(res);
		} else {
			if (list.length <= 0) {
				db.findById(articleTypeColl, {
					_id
				}, (err, item) => {
					if (err) {
						common.end(res);
					} else {
						if (item) {
							db.deleteOne(articleTypeColl, {
								_id
							}, err => {
								common.send(res, err, "删除成功");
							});
						} else {
							common.end(res, 1, "该文章类别不存在，请刷新页面");
						}
					}
				});
			} else {
				common.end(res, 2, "请先将对应的类别文章全部删除，才可以删除该类别");
				db.updateMany("articleList", {
					typeId: mongodb.ObjectId(_id)
				}, {
					$set: {
						isShow: false
					}
				}, err => {
					if (err) {
						common.end(err);
					} else {
						db.updateOne(articleTypeColl, _id, {
							$set: {
								isShow: false
							}
						}, err => {
							common.send(res, err, "删除成功");
						});
					}
				});
			}
		}
	});
}
//编辑
module.exports.put = (req, res) => {
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	var _id = req.query._id;
	var data = {
		typeName: req.body.typeName
	};
	db.findById(articleTypeColl, {
		_id
	}, (err, item) => {
		if (err) {
			common.end(res);
		} else {
			if (item) {
				db.updateOne(articleTypeColl, _id, {
					$set: data
				}, err => {
					common.send(res, err, "修改成功");
				});
			} else {
				common.end(res, 1, "该文章类别不存在，请刷新页面");
			}
		}
	})
}