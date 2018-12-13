const db = require('../modules/db');
const cookie = require('../modules/cookie');
const common = require('../modules/common');

const userColl = "userList";
const visitorColl = "visitorLog";

module.exports.login = (req, res) => {
	db.findOne(userColl, {
		username: req.body.username,
		password: req.body.password
	}, (err, item) => {
		if (item) {
			cookie.setCookie(res, common.encode(item));
			res.send({
				ok: 1,
				msg: "登陆成功"
			});
		} else {
			common.end(res, 2, "账号或密码错误");
		}
	});
};

module.exports.visitorLog = (req, res) => {
	db.insertOne(visitorColl, {
		ip: common.getClientIP(req),
		type: req.body.type,
		content: req.body.content,
		createTime: Date.now()
	}, err => {
		common.send(res, err, "suc");
	});
}