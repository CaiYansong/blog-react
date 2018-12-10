;
const formidable = require('formidable');
const fs = require('fs');

/**
 * @method 上传图片
 * @param {} req -请求
 * @param {string} imgName -图片的键
 * @param {Function} cb -回掉函数
 * cb({
 *  ok:num,//1 success， 2 err， 3 No upload files
 *  params,
 *  newName||msg
 * })
 */
module.exports.upImg = function (req, imgName, cb) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = './upload';
    form.parse(req, function (err, params, file) {
        if (err) {
            cb({
                ok: 2,
                msg: '网络错误'
            });
            return false;
        }
        if (file[imgName] == undefined) {
            cb({
                ok: 3,
                params,
                msg: '未上传文件'
            });
            return 0;
        }
        var filePath = file[imgName].path;
        if (file[imgName].size > 0) { //Upload files
            var keepArr = ['.jpg', '.png', '.gif'];
            var keepExt = filePath.substr(filePath.lastIndexOf('.'));
            if (keepArr.includes(keepExt)) {
                var newName = Date.now() + keepExt;
                fs.rename(filePath, './upload/' + newName, function (err) {
                    if (err) {
                        fs.unlink(filePath, function (err) {
                            cb({
                                ok: 2,
                                msg: '网络错误'
                            });
                        });
                    } else {
                        cb({
                            ok: 1,
                            params,
                            newName
                        })
                    }
                });
            } else {
                fs.unlink(filePath, function (err) {
                    cb({
                        ok: 2,
                        msg: '请上传格式正确的文件, .jpg, .png, .gif'
                    });
                });
            }
        } else { //No upload files
            fs.unlink(filePath, function (err) {
                cb({
                    ok: 3,
                    params,
                    msg: '未上传文件'
                });
            });
        }
    });
};