#LPL
参考项目教程：https://github.com/nswbmw/N-blog/wiki/_pages
项目启动命令：
1、DEBUG=blog:* npm start
2、npm start
3、node app.js

开发环境搭建
npm、nodejs、mongodb、git、sourcetree等

使用的技术：
nondejs后台框架express，示例：https://github.com/nswbmw/N-blog/wiki/_pages
mongodb：http://www.yiibai.com/mongodb/mongodb_data_modeling.html
淘宝组件库：http://m.sui.taobao.org/components/#icons
git开发：https://git-scm.com/book/zh/v2
coding代码托管平台
github博客搭建并放置自己的demo，用作服务器


数据库启动命令：
1、./mongod --dbpath ../blog/
supervisor 都会自动帮我们重启应用
supervisor app.js

每当我们给博客添加新功能后，都要清空数据库（即删除 mongodb/blog 文件夹里所有文件）再启动我们的博客。

app.js：启动文件，或者说入口文件
package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块
node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下
public：存放 image、css、js 等文件
routes：存放路由文件
views：存放视图文件或者说模版文件
bin：存放可执行文件


ejs 的标签系统非常简单，它只有以下三种标签：
<% code %>：JavaScript 代码。
<%= code %>：显示替换过 HTML 特殊字符的内容。
<%- code %>：显示原始 HTML 内容。
<%- include %>：引入公共文件

通过引入会话（session）机制记录用户登录状态



环境搭建：
1、安装nodejs（包含了npm）
2、安装对应系统的mongodb数据库
3、创建数据库的储存空间，跑起数据库
4、安装对应的自动修改相关插件，跑起我们的项目


--------------------------------
伟健
在C:\Users\linweijian\Downloads\bin目录下cmd跑命令: mongod --dbpath C:\Users\linweijian\Downloads\data\db
supervisor app.js

