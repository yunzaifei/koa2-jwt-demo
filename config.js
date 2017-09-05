module.exports = {
  port: '8000',
  jwt: 'xxxx',
  mongodb: 'mongodb://xxxxxx',
  getMsg: function(e){
    switch(e.code){
      case 11000:
        return '用户名已经存在数据库！'
      default:
        return e.message
    }
  }
}