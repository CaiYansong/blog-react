;
const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;

/**
 * @method 私有 建立数据库链接
 * @param {Function} cb 回掉函数(db)
 */
function _connect(cb) {
    mongodbClient.connect('mongodb://127.0.0.1:27017', {
        useNewUrlParser: true
    }, function (err, client) {
        cb(client.db('myApp'));
    });;
}

/**
 * @method 插入一条数据
 * @param {string} coll 集合名
 * @param {Object} obj 要插入的数据
 * @param {Function} cb 回掉函数(err)
 * 
 */
module.exports.insertOne = function (coll, obj, cb) {
    _connect(function (db) {
        db.collection(coll).insertOne(obj, cb);
    });
};

/**
 * @method 通过_id查找
 * @param {string} coll 集合名
 * @param {String} id   数据的id
 * @param {Function} cb 回掉函数(err,item)
 */
module.exports.findById = function (coll, id, cb) {
    _connect(function (db) {
        db.collection(coll).findOne({
            _id: mongodb.ObjectId(id)
        }, cb);
    });
};


/**
 * @method 根据条件获取单个
 * @param {string} coll 集合名
 * @param {Object} where    {}查询条件
 * @param {Function} cb 回掉函数(err,item)
 */
module.exports.findOne = function (coll, where, cb) {
    _connect(function (db) {
        db.collection(coll).findOne(where, cb);
    })
};


/**
 * @method 根据条件获取集合列表
 * @param {string} coll 集合名
 * @param {Object} where    条件
 * @param {Object} where.whereObj {}查询条件
 * @param {Object} where.sort {}排序
 * @param {number} where.skip 0 跳过几个
 * @param {number} where.limit 0 获取几个
 * @param {Function} cb 回掉函数(err,list)
 */
module.exports.find = function (coll, where, cb) {
    if (!where.whereObj) {
        where.whereObj = {};
    }
    if (!where.sort) {
        where.sort = {}
    }
    if (!where.skip) {
        where.skip = 0;
    }
    if (!where.limit) {
        where.limit = 0;
    }
    _connect(function (db) {
        db.collection(coll).find(where.whereObj).sort(where.sort).skip(where.skip).limit(where.limit).toArray(cb);
    })
};

/**
 * @method 通过_id删除
 * @param {string} coll 集合名
 * @param {String} id   数据的id
 * @param {Function} cb 回掉函数(err)
 */
module.exports.deleteOne = function (coll, id, cb) {
    _connect(function (db) {
        db.collection(coll).deleteOne({
            _id: mongodb.ObjectId(id)
        }, cb);
    });
};

/**
 * @method 批量删除
 * @param {String} coll 集合名
 * @param {Array} idList 存放要删除id的数组
 * @param {Function} cb 回掉函数(err)
 */
module.exports.deleteMany = function (coll, idList, cb) {
    var list = [];
    for (var i = 0; i < idList.length; i++) {
        list.push({
            _id: mongodb.ObjectId(idList[i])
        });
    }
    _connect(function (db) {
        db.collection(coll).deleteMany({
            $or: list
        }, cb);
    });
};


/**
 * @method 通过_id修改
 * @param {String} coll 集合名
 * @param {string} id       数据的id
 * @param {Object} update   修改的数据$set: obj
 * @param {Function} cb 回掉函数(err)
 */
module.exports.updateOne = function (coll, id, update, cb) {
    _connect(function (db) {
        db.collection(coll).updateOne({
            _id: mongodb.ObjectId(id)
        }, update, cb);
    });
};

/**
 *@method updateMany 批量修改
 *
 * @param {*} coll 集合名
 * @param {*} where 条件
 * @param {*} update  修改的数据$set: obj
 * @param {*} cb 回掉函数(err)
 */
module.exports.updateMany = function (coll, where, update, cb) {
    _connect(function (db) {
        db.collection(coll).updateMany(where, update, cb);
    });
};

/**
 * @method 计算符合条件的条数
 * @param {string} coll 集合名
 * @param {Object}  whereObj    条件
 * @param {Function} cb 回掉函数(err,count)
 */
module.exports.count = function (coll, whereObj, cb) {
    _connect(function (db) {
        db.collection(coll).find(whereObj).count(cb);
    });
};
/**
 *@method getArticleList
 *
 * @param {Object} match
 * @param {Number} skip
 * @param {Number} limit
 * @param {Function} cb 回掉函数(err,adminInfo)
 */
module.exports.getArticleList = (match, skip, limit, cb) => {
    _connect(db => {
        db.collection('articleList').aggregate([
            {
                $match: match
            },{
                $sort: {
                    createTime: -1
                }
            }, //时间倒序//注意顺序 
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "articleTypeList", //要进行关联的集合
                    localField: "typeId", //关联集合在本集合的关键字段，类似于外键
                    foreignField: "_id", //外部集合的字段依据，关联集合的主键
                    as: "typeInfo" //将合并的数据放到指定的字段当中
                }
            }
        ]).toArray(cb); //!!!!!注意这里需要使用toArray(cb)返回数据
    });
};

module.exports.getArticle = (_id, cb) => {
    _connect(db => {
        db.collection('articleList').aggregate([{
            $match: {
                _id: mongodb.ObjectId(_id)
            }
        }, {
            $lookup: {
                from: "articleTypeList", //要进行关联的集合
                localField: "typeId", //关联集合在本集合的关键字段，类似于外键
                foreignField: "_id", //外部集合的字段依据，关联集合的主键
                as: "typeInfo" //将合并的数据放到指定的字段当中
            }
        }]).toArray(cb); //!!!!!注意这里需要使用toArray(cb)返回数据
    });
}