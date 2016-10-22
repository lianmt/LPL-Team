var mongodb = require('./db');
var crypto = require('crypto');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
  this.head = user.head;
  this.info = user.info;
  this.nickname = user.nickname;
};

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var md5 = crypto.createHash('md5'),
      email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
      head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
  //要存入数据库的用户信息文档
  var user = {
      name: this.name,
      password: this.password,
      email: this.email,
      info: this.info,
      nickname: this.nickname,
      head: this.head
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

//读取用户信息
User.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};

//获取用户列表
User.getAll = function(callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('sessions', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.find(function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, user);
      });
    });
  });
};

//获取个人信息
User.settings = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //根据用户名、发表日期及文章名进行查询
      collection.findOne({
        "name": name
      }, function (err, doc) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, doc);//返回查询的一篇文章（markdown 格式）
      });
    });
  });
};

//修改个人信息
User.modify = function(name, nickname, info, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //更新文章内容
      collection.update({
        "name": name
      }, {
        $set: {
          nickname: nickname,
          info: info
        }
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};