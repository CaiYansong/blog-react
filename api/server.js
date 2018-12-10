const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./modules/db');
const common = require('./modules/common');

const articleType = require('./router/articleType');
const article = require('./router/article');

const userColl = "userList";
const messageColl = "messageList";
const visitorColl = "visitorLog";

app.use(bodyParser.json());
//===============================登录===============================
app.post('/login', (req, res) => {
	db.findOne(userColl, {
		username: req.body.username,
		password: req.body.password
	}, (err, item) => {
		if (item) {
			res.send({
				ok: 1,
				token: common.encode(item)
			});
		} else {
			common.end(res, 2, "账号或密码错误");
		}
	});
});

//===============================文章类别===============================
app.post("/articleType", articleType.post);
app.get("/articleType", articleType.get);
app.delete("/articleType", articleType.delete);
app.put("/articleType", articleType.put);

//===============================文章===============================
app.post("/article", article.post);
app.get("/article", article.get);
app.get("/myArticle", article.getMy);
app.delete("/article", article.delete);
app.put("/article", article.put);

//===============================留言===============================
app.post('/message', (req, res) => {
	var userIp = common.getClientIP(req);
	db.insertOne(messageColl, {
		userIp,
		content: req.body.content,
		createTime: Date.now()
	}, err => {
		common.send(res, err, "留言成功");
	});
});

//===============================用户操作记录===============================
app.post('/visitorLog', (req, res) => {
	db.insertOne(visitorColl, {
		ip: common.getClientIP(req),
		type: req.body.type,
		content: req.body.content,
		createTime: Date.now()
	}, err => {
		common.send(res, err, "suc");
	});
});


app.listen(80, err => {
	if (err) {
		console.log(err);
	} else {
		console.log("server start.");
	}
});