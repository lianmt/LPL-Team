// 生成一个路由实例

// var express = require('express');
// var router = express.Router();

/**
 * 这段代码的意思是当访问主页时，
 * 调用 ejs 模板引擎，来渲染 index.ejs 模版文件
 * (即将 title 变量全部替换为字符串 Express)，
 * 生成静态页面并显示在浏览器中。
 */
 // router.get('/', function(req, res, next) {
 //   res.render('index', { title: 'LPL' });
 // });


module.exports = function(app) {
  // 添加一条测试路由
  // app.get('/lianmingtang', function (req, res) {
  //   res.send('hello,world!');
  // });

  app.get('/', function(req, res, next) {
    res.render('index', { title: 'LPL' });
  });
};
