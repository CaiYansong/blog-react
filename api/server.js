const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const articleType = require('./router/articleType');
const article = require('./router/article');
const message = require('./router/message');
const user = require('./router/user');

app.use(bodyParser.json());

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
app.post('/message', message.post);
app.get('/message', message.get);
app.delete('/message', message.delete);
app.put('/message', message.put);
//===============================用户操作记录===============================
app.post('/visitorLog', user.visitorLog);
//===============================登录===============================
app.post('/login', user.login);

app.listen(80, err => {
	if (err) {
		console.log(err);
	} else {
		console.log("server start.");
	}
});