const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const articleType = require('./router/articleType');
const article = require('./router/article');
const message = require('./router/message');
const user = require('./router/user');

app.use(bodyParser.json());
app.use(express.static("../build"));

//===============================文章类别===============================
app.post("/articleType", articleType.post);
app.get("/articleType", articleType.get);
app.delete("/articleType", articleType.delete);
app.put("/articleType", articleType.put);
//===============================文章===============================
app.post("/articleItem", article.post);
app.get("/articleItem", article.get);
app.get("/articleList", article.getList);
app.get("/myArticle", article.getMy);
app.get("/myArticleList", article.getMyList);
app.delete("/articleItem", article.delete);
app.put("/articleItem", article.put);
//===============================留言===============================
app.post('/messageItem', message.post);
app.get('/messageList', message.get);
app.delete('/messageItem', message.delete);
app.put('/messageItem', message.put);
//===============================用户操作记录===============================
app.post('/visitorLog', user.visitorLog);
//===============================登录===============================
app.post('/login', user.login);

app.listen(8080, err => {
	if (err) {
		console.log(err);
	} else {
		console.log("server start.");
	}
});