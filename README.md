## gitee-blog

> 基于 Gitee-api + Vue + Markdown 的个人博客网站，完全免费，无需个人服务器即可在线维护博客

### 预览

github: [qszone.com/gitee-blog](https://qszone.com/gitee-blog)

gitee: [zclzone.gitee.io/gitee-blog](https://zclzone.gitee.io/gitee-blog)

### 亮点

1. 无需服务器即可实现在后台网站在线维护博客文章（增删改查），增减文章类型，后续计划将更多的网站配置放到后台在线维护
2. 使用 Gitee Api，在国内访问速度快，体验好，当然如果有朋友愿意开发一个 github 版的也是相当不错的，本人由于访问 github 速度太慢，即使开发出来也没多少实用性，所以暂不折腾了
3. 网站内容配置文件化，后续计划增加更多可配置化的设置，再慢慢将网站配置转移到后台网站维护,如主题色配置，多模板等等
4. 后台网站使用 Gitee Oauth 登录验证，其他人可访问后台网站但无法更改数据

### 使用方式

#### 1. Fork or Clone 此仓库并安装依赖

当然了，Fork 是可选的，不过对此项目感兴趣的朋友可以点点 Star，或者 Fork 此项目，如果您对此项目有足够兴趣，欢迎提交您宝贵的 Pr 让此项目变得更加完备和好用

```
  git clone https://github.com/zclzone/gitee-blog.git
  cd gitee-blog
  npm install
```

### 2. 修改配置 src 文件夹下的配置文件 settings.js

![settings.js](https://gitee.com/zclzone/res/raw/master/images/gitee-blog-settings.png)

### 3. 构建项目并发布

1. 如果您没有 gitee 账号,您需要先创建一个 [gitee](https://gitee.com/) 账号,并确保账号下没有名为**gitee-blog-db**的仓库
2. 执行语句构建项目（当然您可以不急着构建，可以直接在本地运行看下效果，执行 npm run serve 即可）
3. 创建一个空的 gitee 或者 github 仓库，将构建好的代码(dist 文件夹下)推送到此仓库并发布 pages，理论上您可以发布到任何外网能访问的地方，如码云、github 等，具体如何发布这里不作详细介绍，我会在我的[博客](https://zclzone.gitee.io/gitee-blog)专门写一篇博客介绍如何发布 pages
4. 发布之后就可以访问了，默认页面是博客首页，后台地址是[您的发布地址/#/admin],如：[https://zclzone.gitee.io/gitee-blog/#/admin](https://zclzone.gitee.io/gitee-blog)

> 注意：首次打开时会跳转至后台页面并提示您初始化博客网站，即生成一个 gitee 仓库作为您博客网站的“数据库”，

以下指令假设你已经创建了一个空仓库用于发布 pages

```
  npm run build
  cd dist
  git init
  git add .
  git commit -m 'init gitee-blog'
  git remote add origin [您创建的空仓库地址]
  git push -u origin master
```
