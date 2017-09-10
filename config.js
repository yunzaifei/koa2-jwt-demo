module.exports = {
  port: '8000',
  jwt_secret: '!@#$1234QWER',
  secret_key: '1!2@3#4$qwer',
  mongodb: 'mongodb://admin:mima1234@lukemongo-shard-00-02-rxfuv.mongodb.net:27017/babyshow?ssl=true&replicaSet=lukeMongo-shard-0&authSource=admin',
  getErr: function(e){
    console.log(e)
    e.code = e.code || 500
    switch(e.code){
      case 11000:
        e.message = '用户名已经存在！'
    }
    return {
      code: e.code,
      message: e.message
    }
  }
}