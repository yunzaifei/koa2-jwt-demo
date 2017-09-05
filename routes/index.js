const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

router.prefix('/api')

router.get('/', async(ctx, next) => {
  ctx.redirect('http://google.com')
})

router.post('/login', async(ctx, next) => {
  console.log(ctx.request.body)
  const uName = ctx.request.body.user_name
  const passwd = ctx.request.body.passwd

  ctx.body = {
    name: uName,
    passwd: passwd
  }
})

router.post('/register', async ctx => {
  const {user_name, passwd} = ctx.request.body

  let user = new User({
    user_name: user_name,
    password: passwd,
    app_key: 'key111111',
    app_secret: 'secret123'
  })

  let res = { 
    code: 200, 
    message: 'OK!', 
    token: '',
    uid: ''
  }
  try{
    let result = await user.save();
    //console.log('result: ', result)
    res.uid = result._id
    res.token = jwt.sign(result._id, config.jwt, {expiresIn: 10*60})
  }catch(e){
    res.code = e.code || 7474
    res.message = config.getMsg(e)
  }
  ctx.body = res
})

router.get('/userinfo', async(ctx, next) => {
  console.log('token', ctx)
  const token = ctx.token // 获取jwt 
  console.log('token', token)
  let payload 
  if (token) { 
    payload = await verify(token.split(' ')[1], config.jwt) // 
    // 解密，获取payload 
    ctx.body = { payload } 
  } else { 
    ctx.body = { 
      message: 'token 错误', 
      code: -1 
    } 
  }
})

module.exports = router