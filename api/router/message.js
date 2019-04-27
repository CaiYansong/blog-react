const db = require('../modules/db');
const common = require("../modules/common");
const {
	checkToken
} = require('../modules/checkToken');

const messageColl = "messageList";

//添加留言
module.exports.post = (req, res) => {
	var userIp = common.getClientIP(req);
	console.log(userIp,common.getNowTime());
	var min = new Date(common.getNowDate()).getTime();
	var max = min + 24 * 60 * 60 * 1000;
	if (!req.body.content) {
		res.send({
			ok: 2,
			msg: "内容不能为空"
		});
		return 0;
	}
	db.count(messageColl, {
		userIp,
		createTime: {
			$gt: min,
			$lt: max
		}
	}, (err, count) => {
		if (count >= 10) {
			res.send({
				ok: 2,
				msg: "每天只能发表10条"
			});
			return 0;
		}
		db.insertOne(messageColl, {
			userIp,
			content: req.body.content,
			createTime: Date.now()
		}, err => {
			common.send(res, err, "留言成功");
		});
	});
}
//获取留言列表
module.exports.get = (req, res) => {
	var where = {};
	db.count(messageColl, where, (err, count) => {
		var pageIndex = (req.query.pageIndex || 1) / 1;
		var pageNum = 5;
		var pageSum = Math.ceil(count / pageNum);
		if (pageIndex < 1) {
			pageIndex = 1;
		}
		if (pageSum < 1) {
			pageSum = 1;
		}
		if (pageIndex > pageSum) {
			pageIndex = pageSum;
		}
		db.find(messageColl, {
			where,
			sort: {
				createTime: -1
			},
			skip: (pageIndex - 1) * pageNum,
			limit: pageNum
		}, (err, messageList) => {
			common.send(res, err, {
				messageList,
				pageIndex,
				pageSum
			});
		})
	});
};
//删除留言
module.exports.delete = (req, res) => {
	if (checkToken(res, req.get("Authorization"))) {
		return 0;
	}
	db.deleteOne(messageColl, req.query._id, err => {
		common.send(res, err, "删除成功");
	});
};
//修改留言
module.exports.put = (req, res) => {

};