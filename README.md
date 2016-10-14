#LPL
参考项目教程：https://github.com/nswbmw/N-blog/wiki/_pages
启动命令的方式：
1、DEBUG=blog:* npm start
2、npm start
3、node app.js


app.js：启动文件，或者说入口文件
package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块
node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下
public：存放 image、css、js 等文件
routes：存放路由文件
views：存放视图文件或者说模版文件
bin：存放可执行文件