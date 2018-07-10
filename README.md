# koa2-jwt-demo

koa2开发的api服务示例，使用用jwt验证

## 安装及部署
* 执行命令npm install
* 执行命令npm start启动服务
* 可以通过postman等工具对服务进行测试，或者通过npm run test命令使用网页页查看

## 涉及知识点
* koa2框架
* jwt原理及应用
* mongoose应用
* async/await的简单使用

## 知识点讲解

### koa2框架
koa就是一种简单好用的Web框架。它的特点是优雅、简洁、表达力强、自由度高。本身代码只有1000多行，所有功能都通过插件实现，很符合Unix哲学。

koa官网 [http://koajs.com/](http://koajs.com/)

koa中文文档 [https://github.com/guo-yu/koa-guide](https://github.com/guo-yu/koa-guide)

koa2进阶学习笔记 [https://chenshenhai.github.io/koa2-note/](https://chenshenhai.github.io/koa2-note/)

#### 本示例中涉及的中间件

|中间件|功能说明|链接|备注|
|----|----|----|----|
|bcrypt| 加密 |[![NPM version](https://img.shields.io/npm/v/bcrypt.svg?style=flat-square)](https://npmjs.org/package/bcrypt)| 用于用户密码存入数据库时 |
|jsonwebtoken| jwt实现 |[![NPM version](https://img.shields.io/npm/v/jsonwebtoken.svg?style=flat-square)](https://npmjs.org/package/jsonwebtoken)| |
|kcors| koa跨域 |[![NPM version](https://img.shields.io/npm/v/kcors.svg?style=flat-square)](https://npmjs.org/package/kcors)| |
|koa| koa框架 |[![NPM version](https://img.shields.io/npm/v/koa.svg?style=flat-square)](https://npmjs.org/package/koa)| |
|koa-bodyparser| 数据解析到ctx.request.body中 |[![NPM version](https://img.shields.io/npm/v/koa-bodyparser.svg?style=flat-square)](https://npmjs.org/package/koa-bodyparser)| [详细](https://chenshenhai.github.io/koa2-note/note/request/post-use-middleware.html) |
|koa-json| response转换位json格式 |[![NPM version](https://img.shields.io/npm/v/koa-json.svg?style=flat-square)](https://npmjs.org/package/koa-json)| |
|koa-jwt| jwt自动校验 |[![NPM version](https://img.shields.io/npm/v/koa-jwt.svg?style=flat-square)](https://npmjs.org/package/koa-jwt)| 使用后不用在每个路由下手写校验方法 |
|koa-logger| 日志 |[![NPM version](https://img.shields.io/npm/v/koa-logger.svg?style=flat-square)](https://npmjs.org/package/koa-logger)| |
|koa-router| 路由 |[![NPM version](https://img.shields.io/npm/v/koa-router.svg?style=flat-square)](https://npmjs.org/package/koa-router)| [详细](https://chenshenhai.github.io/koa2-note/note/route/koa-router.html) |
|mongoose| 操作mongodb数据库 |[![NPM version](https://img.shields.io/npm/v/mongoose.svg?style=flat-square)](https://npmjs.org/package/mongoose)| |

#### 代码结构说明

本示例代码实现api服务，因为没有页面展示功能，所以没有使用[koa-static](https://www.npmjs.com/package/koa-static)加载静态资源和创建views视图结构。 

启动文件是app.js。

route文件夹是路由服务。 

config.js文件记录所有配置信息方便统一管理。

### jwt原理及应用

#### jwt原理
JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用JWT在用户和服务器之间传递安全可靠的信息。一个JWT实际上就是一个字符串，它由三部分组成，头部、载荷与签名。注意，在JWT中，不应该在载荷里面加入任何敏感的数据。查看jwt信息：[https://jwt.io/](https://jwt.io/)

[jwt原理](http://blog.leapoahead.com/2015/09/06/understanding-jwt/)

[基于Token的WEB后台认证机制](http://www.cnblogs.com/xiekeli/p/5607107.html)

#### jwt应用
对于jwt的应用，本示例中主要用到`jsonwebtoken`[![NPM version](https://img.shields.io/npm/v/jsonwebtoken.svg?style=flat-square)](https://npmjs.org/package/jsonwebtoken)和`koa-jwt`[![NPM version](https://img.shields.io/npm/v/koa-jwt.svg?style=flat-square)](https://npmjs.org/package/koa-jwt)两个中间件。`koa-jwt`是对`jsonwebtoken`功能的封装，如果想更灵活的实现并且不怕麻烦，可以只使用jsonwebtoken中间件。

jsonwebtoken用法
```
//jsonwebtoken在服务端生成token返回给客户端
const jwt = require('jsonwebtoken')
const token = jwt.sign({
    id: user._id,
    secret: user.app_secret
}, config.jwt_secret, {expiresIn: 3600})
    
ctx.body = { 
  code: 200, 
  message: '登录成功!', 
  token: token
}
```
koa-jwt用法
```
//koa-jwt在服务端校验从客户端提交的token值
const app = new Koa()
const jwt = require('koa-jwt')
app.use(jwt({secret: config.jwt_secret}).unless({path:[/^\/api\/login/, /^\/api\/register/]})) //usless排除进行jwt校验的路由

//在路由中处理
const router = require('koa-router')()
router.post('/xxx', async ctx => {
  const token = ctx.state.user
  console.log('user_id:', token.id)
  console.log('user.app_secret:', token.secret)
}
```

### mongoose应用
mongoose文档：[http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)  
mongoose中文文档：[https://mongoose.shujuwajue.com/](https://mongoose.shujuwajue.com/)

### async/await的简单使用
[async 函数](http://es6.ruanyifeng.com/#docs/async)

[深入理解ES7的async/await](http://coolcao.com/2016/12/12/deeper-understanding-of-async-await/)

[Callback、Promise、Generator、async/await对比](https://www.lazycoffee.com/articles/view?id=58ab09eea072b332753d9774)
