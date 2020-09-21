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

当然了，Fork 是可选的，不过对此项目感兴趣的朋友可以点点 Star，或者 Fork 此项目提交您宝贵的 Pr 让此项目变得更加完备和好用

```
  git clone https://github.com/zclzone/gitee-blog-src.git
  cd gitee-blog-src
  npm install
```

### 2. 修改配置 src 文件夹下的配置文件 settings.js

![settings.js](https://gitee.com/zclzone/res/raw/master/images/gitee-blog-settings.png)

### 3. 构建项目并发布

1. 在 [gitee](https://gitee.com/) 创建一个空的仓库，仓库名为 gitee-blog（仓库名可自定义，但需跟 setting.js 中 giteeApiOptions 的配置保持一致）,如果您没有 gitee 账号,您需要先创建一个 [gitee](https://gitee.com/) 账号
2. 执行语句构建项目
3. 将构建好的代码(dist 文件夹下)推送到 gitee 仓库并发布 pages(理论上可以发布到任何外网能访问的地方，不过首次必须推送到 gitee 仓库以初始化博客的“数据库”)
4. 构建好之后就可以访问了，默认页面是博客首页，后台地址是[您的发布地址 /#/admin],如：[https://zclzone.gitee.io/gitee-blog/#/admin](https://zclzone.gitee.io/gitee-blog)

```
  npm run build
  cd dist
  git init
  git add .
  git commit -m 'init gitee-blog'
  git remote add origin [您创建的空仓库地址]
  git push -u origin master
```
