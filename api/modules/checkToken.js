const db = require("./db");
const common = require('./common');
const cookie = require('../modules/cookie');


module.exports.checkToken = function (req, res) {
	var token = cookie.getToken(req);
	if (!token) {
		res.send({
			ok: 2,
			msg: "不合法的操作"
		});
		return true;
	}
	var decoded = common.decode(token);
	if (decoded.exp < Date.now()) {
		common.end(res, -2, '登录状态已过期，请重新登录');
	} else {
		db.findOne("userList", {
			username: decoded.username,
			password: decoded.password
		}, (err, item) => {
			if (err) {
				common.end(res);
			} else {
				if (item) {
					return false;
				} else {
					common.end(res, 2, '错误的token');
				}
			}
		});
	}
}