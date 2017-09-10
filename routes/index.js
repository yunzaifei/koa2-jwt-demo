const router = require('koa-router')()
const User = require('../models/user')
const base = require('../models/base')

router.prefix('/api')

router.get('/', async(ctx, next) => {
  ctx.redirect('http://google.com')
})

//登录
router.post('/login', async ctx => {
  const {userName, passwd} = ctx.request.body

  try{
    const user = await User.findByName(userName)
    const isMatch = await user.comparePassword(passwd);
    if(!isMatch){
      ctx.throw(423, '用户名或密码错误！')
    }
    const token = base.signToke(user)
    
    ctx.body = { 
      code: 200, 
      message: '登录成功!', 
      token: token
    }
  }catch(e){
    ctx.throw(e)
  }
})

//注册
router.post('/register', async ctx => {
  const {userName, passwd} = ctx.request.body

  let user = new User({
    user_name: userName,
    password: passwd
  })
  let result = await user.save();
  console.log('result: ', result)

  ctx.body = {
    code: 200,
    message: '注册成功！'
  }
})

//获取用户信息
router.post('/userinfo', async ctx => {
  
  const user = await base.checkToken(ctx, User, true)
  ctx.body = {
    code: 200,
    message: '获取用户信息成功！',
    userName: user.user_name,
    token: base.signToke(user)
  }
  
  /*
  const token = await base.checkToken(ctx, User)
  ctx.body = {
    token: token
  }
  */
})

module.exports = router