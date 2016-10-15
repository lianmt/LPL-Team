// 入口文件

var express = require('express'); // 生成一个express实例 app。
var path = require('path'); 
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

/**
 * 设置数据库名、数据库地址和数据库端口创建了一个数据库连接实例，
 * 并通过 module.exports 导出该实例
 * 通过 require 这个文件来对数据库进行读写
 */
var settings = require('./settings');

// 后期简化而成的代码
// var users = require('./routes/users');



var app = express();


// 设置端口号
app.set('port', process.env.PORT || 3000);
// 设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,
// __dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置/favicon.ico为 网站favicon图标。
// app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

// 加载日志中间件
app.use(logger('dev'));
// 加载解析json的中间件
app.use(bodyParser.json());
// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 加载解析cookie的中间件
app.use(cookieParser());
// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


/**
 * 后期简化而成的代码
 */

// // 路由控制器
// app.use('/', routes);
// app.use('/users', users);

// // 捕获404错误，并转发到错误处理器
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // 生产环境下的错误处理器，不会将错误信息泄露给用户
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// // 导出app实例供其他模块调用
// module.exports = app;
