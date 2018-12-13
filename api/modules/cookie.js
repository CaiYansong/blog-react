module.exports.getToken = (req) => {
	var Cookies = {};
	req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
		var parts = Cookie.split('=');
		Cookies[parts[0].trim()] = (parts[1] || '').trim();
	});
	return Cookies.token;
};

module.exports.setCookie = (res, token) => {
	// 向客户端设置一个Cookie
	res.writeHead(200, {
		'Set-Cookie': 'token=' + token,
		'Content-Type': 'text/plain'
	});
};