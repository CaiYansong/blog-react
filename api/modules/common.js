const jwt = require('jwt-simple');
const key = "cys20181210";

// 获得当前时间
module.exports.getNowTime = function () {
    var date = new Date();
    return (date.getFullYear() +
        "-" + (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" + date.getDate().toString().padStart(2, "0") +
        " " + date.getHours().toString().padStart(2, "0") +
        ":" + date.getMinutes().toString().padStart(2, "0") +
        ":" + date.getSeconds().toString().padStart(2, "0"));
}
// 获得当前日期
module.exports.getNowDate = function () {
    var date = new Date();
    return (date.getFullYear() +
        "-" + (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" + date.getDate().toString().padStart(2, "0"));
}
// 发送响应结果
module.exports.end = function (res, ok = 2, msg = "网络连接错误") {
    res.end(JSON.stringify({
        ok,
        msg
    }))
}

/**
 *@method send(res,err,object) 判断是否有错误，并发送响应结果
 *
 * @param {*} res
 * @param {*} err
 * @param {Object||String} data Object||String
 */
module.exports.send = function (res, err, data = '成功 autoBack') {
    if (err) {
        res.end(JSON.stringify({
            ok: 2,
            msg: "网络错误 autoBack"
        }));
    } else {
        var obj = {
            ok: 1
        };
        if (typeof data == 'object') {
            for (var key in data) {
                obj[key] = data[key];
            }
        } else {
            obj.msg = data;
        }
        res.end(JSON.stringify(obj));
    }
}

//生成 token
module.exports.encode = function (item) {
    return jwt.encode({
        username: item.username,
        password: item.password,
        exp: Date.now() + 300 * 60 * 1000
    }, key);
}

//解析 token
module.exports.decode = function (token) {
    return jwt.decode(token, key);
}


/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
module.exports.getClientIP = function (req) {
    var ip = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
    var userIp = ip.match(/\d+.\d+.\d+.\d+/)
    ip = userIp ? userIp.join('.') : null;
    return ip;
};

// function getIp(req){
//     let getClientIp = function (req) {
//         return req.headers['x-forwarded-for'] ||
//             req.connection.remoteAddress ||
//             req.socket.remoteAddress ||
//             req.connection.socket.remoteAddress || '';
//     };
//     let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
//     ip = ip ? ip.join('.') : null;
//     console.log(ip)
// }