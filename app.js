const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const json = require('koa-json')
//const jwt = require('koa-jwt')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect(config.mongodb, {useMongoClient:true})

const index = require('./routes/index')

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
//app.use(jwt({secret: config.jwt}).unless({path:[/^\/api/, /^\/api\/login/, /^\/api\/register/]}))
app.use(logger())

app.use(index.routes(), index.allowedMethods())
/*
const http = require('http')
const server = http.createServer(app.callback())
const port = process.env.port || '8000'

server.listen(port)
server.on('listening', onListening)

function onListening(){
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
*/
const port = process.env.port || config.port
app.listen(port);


