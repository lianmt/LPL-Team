#LPL
使用的技术：
nondejs后台框架express，示例：https://github.com/nswbmw/N-blog/wiki/_pages
mongodb：http://www.yiibai.com/mongodb/mongodb_data_modeling.html
淘宝组件库：http://m.sui.taobao.org/components/#icons
git开发：https://git-scm.com/book/zh/v2
coding代码托管平台
github博客搭建并放置自己的demo，用作服务器

首先运行mongodb数据库然后在运行项目
Windows：
    运行mongodb数据库：
        在mongodb数据库目录下的bin目录下，cmd跑命令: mongod --dbpath  项目路径（例如：C:\Users\linweijian\Downloads\data\db）
    运行项目，共有三个可使用命令：
        每次修改代码需要重启项目
        npm start
        node app.js
        自动帮你启动项目，安装supervisor 模块
        supervisor app.js

MAC:
    运行mongodb数据库：
        在mongodb数据库目录下的bin目录下，打开终端，执行：./mongod --dbpath ../（项目名，例如 lpl/ ）
    运行项目，共有三个可使用命令：
        每次修改代码需要重启项目
        nam start
        node app.js
        自动帮你启动项目，安装supervisor 模块
        supervisor app.js

每当我们给博客添加新功能后，都要清空数据库（即删除 mongodb/blog 文件夹里所有文件）再启动我们的博客。

环境搭建：
1、安装nodejs（包含了npm）
2、安装对应系统的mongodb数据库
3、创建数据库的储存空间，跑起数据库
4、安装对应的自动修改相关插件，跑起我们的项目


--------------------------------
伟健
在C:\Users\linweijian\Downloads\bin目录下cmd跑命令: mongod --dbpath C:\Users\linweijian\Downloads\data\db
supervisor app.js


总共包含的内容：
毕业设计
    - nondejs后台框架express
    - mongodb
    - 淘宝UI组件库
    - 功能列表
论文
微信平台
    - 微信公众号创建、运营、设置

环境搭建
    - 服务器：github博客【代码托管平台】
    - Conding，代码托管平台

导师教程
    - 包含html、css

开发流程
    - git版本控制系统合作开发，使用工具sourcetree












