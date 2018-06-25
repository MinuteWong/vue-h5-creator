const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const path = require('path')
const { uploadFile } = require('./service/upload')

const app = new Koa()
const router = new Router()

const staticPath = './static'

router.get('/api/media/img', async(ctx, next) => {
  next()
})

router.post('/api/upload/file', async(ctx, next) => {
  // 上传文件请求处理
  let result = { success: false }
  const serverFilePath = path.join(__dirname, 'static')

  // 上传文件事件
  result = await uploadFile(ctx, {
    fileType: 'album', // common or album
    path: serverFilePath
  })

  ctx.body = result
  next()
})

app.use(serve(
  path.join(__dirname, staticPath)
))

app.use(bodyParser())
app.use(router.routes())
// app.use(router.allowedMethods())

app.listen(80, () => {
  console.log('running')
})
