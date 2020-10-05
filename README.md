# [gitee-blog](https://github.com/zclzone/blog)

> 基于 Gitee-api + Vue + Markdown 的个人博客网站，完全免费，无需个人服务器即可在线维护博客

### 预览

github: [qszone.com/blog](https://qszone.com/blog)

gitee: [zclzone.gitee.io/blog](https://zclzone.gitee.io/blog)

### 亮点

1. 无需服务器即可实现在后台网站在线维护博客文章（增删改查），增减文章类型，后续计划将更多的网站配置放到后台在线维护。
2. 使用 Gitee Api，在国内访问速度快，体验好，当然如果有朋友愿意开发一个 github 版的也是相当不错的，本人由于访问 github 速度太慢，即使开发出来也没多少实用性，所以暂不折腾了。
3. 网站内容配置文件化，后续计划增加更多可配置化的设置，再慢慢将网站配置转移到后台网站维护,如主题色配置，多模板等等。
4. 后台网站使用 Gitee Oauth 登录验证，其他人可访问后台网站但无法更改数据。
5. 使用 Vue 开发，国内会使用 Vue 开发的程序员还是挺多的，考虑到 SEO 后期可能会使用 nuxtjs 重构。

### 使用方式

<details><summary><b>1. Fork & Clone 此仓库并安装依赖</b></summary>

当然了，Fork 是可选的，不过对此项目感兴趣的朋友可以点点 Star，或者 Fork 此项目，如果您对此项目有足够兴趣，欢迎提交您宝贵的 Pr 让此项目变得更加完备和好用

```
  git clone https://github.com/zclzone/blog.git
  cd blog
  npm install
```

</details>

<details><summary><b>2. 修改配置 src 文件夹下的配置文件 settings.js</b></summary>

需确保将 giteeApiOptions 的配置信息修改成自己的，至于其他配置信息我计划写一篇博客单独介绍，请留意我的[博客网站](https://qszone.com/blog)
![settings.js](https://gitee.com/zclzone/res/raw/master/images/gitee-blog-settings.png)

</details>

<details><summary><b>3. 构建项目并发布</b></summary>

1. 如果您没有 gitee 账号,您需要先创建一个 [gitee](https://gitee.com/) 账号,并确保账号下没有名为**gitee-blog-db**的仓库
2. Fork gitee 仓库 [gitee-blog-db](https://gitee.com/qszone/gitee-blog-db)，此仓库将作为博客的“数据库”，或者您也可以 Clone 此仓库再推送到 gitee，仓库名可以自定义，但必须跟 settings.js 下 giteeApiOptions 的 repo 保持一致
3. 执行语句构建项目（当然您可以不急着构建，可以直接在本地运行看下效果，执行 npm run serve 即可）
4. 创建一个空的 gitee 或者 github 仓库，将构建好的代码(dist 文件夹下)推送到此仓库并发布 pages，理论上您可以发布到任何外网能访问的地方，如码云、github 等，具体如何发布这里不作详细介绍，我会在我的[博客](https://qszone.com/blog)专门写一篇博客介绍如何发布 pages
5. 发布之后就可以访问了，默认页面是博客首页，后台地址是[您的发布地址/#/admin],如：[https://qszone.com/blog/#/admin](https://qszone.com/blog)

以下指令假设您 gitee “数据库” 已经存在并且创建了一个空仓库用于发布 pages

```
  npm run build
  cd dist
  git init
  git add .
  git commit -m 'init blog'
  git remote add origin [您创建的空仓库地址]
  git push -u origin master
```

</details>
