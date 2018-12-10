const db = require("./modules/db");
const common = require('./common');

module.exports.checkToken = function (res, token) {
	var decoded = common.decode(token);
	if (decoded.exp > Date.now()) {
		this.end(res, -2, '登录状态已过期，请重新登录');
	} else {
		db.findOne("userList", {
			username: decoded.username,
			password: decoded.password
		}, (err, item) => {
			if (err) {
				common.end(res);
			} else {
				if (item) {
					common.end(res, -2, "请重新登录");
					return false;
				} else {
					common.end(res, 2, '错误的token');
				}
			}
		});
	}
}