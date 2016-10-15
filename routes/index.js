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

// crypto 是 Node.js 的一个核心模块，我们用它生成散列值来加密密码。
var crypto = require('crypto'),
    User = require('../models/user.js');

module.exports = function(app) {
  // 添加一条测试路由
  // app.get('/lianmingtang', function (req, res) {
  //   res.send('hello,world!');
  // });

  app.get('/', function (req, res) {
    res.render('index', {
      title: '主页',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.get('/reg', function (req, res) {
    res.render('reg', {
      title: '注册',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/reg', function (req, res) {
    // req.body就是 POST 请求信息解析过后的对象，
    // 例如我们要访问 POST 来的表单内的 name="password" 域的值，
    // 只需访问 req.body['password'] 或 req.body.password 即可
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
      req.flash('error', '两次输入的密码不一致!'); 

      // 重定向功能，实现了页面的跳转
      return res.redirect('/reg');//返回注册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: name,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在 
    //User 是一个描述数据的对象，即 MVC 架构中的模型。
    //前面我们使用了许多视图和控制器，这是第一次接触到模型。
    //与视图和控制器不同，模型是真正与数据打交道的工具，
    //没有模型，网站就只是一个外壳，不能发挥真实的作用，因此它是框架中最根本的部分。
    User.get(newUser.name, function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      if (user) {
        req.flash('error', '用户已存在!');
        return res.redirect('/reg');//返回注册页
      }
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg');//注册失败返回主册页
        }
        req.session.user = newUser;//用户信息存入 session
        req.flash('success', '注册成功!');
        res.redirect('/');//注册成功后返回主页
      });
    });
  });
  app.get('/login', function (req, res) {
      res.render('login', {
          title: '登录',
          user: req.session.user,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()});
  });
  app.post('/login', function (req, res) {
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.get(req.body.name, function (err, user) {
      if (!user) {
        req.flash('error', '用户不存在!'); 
        return res.redirect('/login');//用户不存在则跳转到登录页
      }
      //检查密码是否一致
      if (user.password != password) {
        req.flash('error', '密码错误!'); 
        return res.redirect('/login');//密码错误则跳转到登录页
      }
      //用户名密码都匹配后，将用户信息存入 session
      req.session.user = user;
      req.flash('success', '登陆成功!');
      res.redirect('/');//登陆成功后跳转到主页
    });
  });
  app.get('/post', function (req, res) {
    res.render('post', { title: '新建教程' });
  });
  app.post('/post', function (req, res) {
  });
  app.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.redirect('/');//登出成功后跳转到主页
  });
};
