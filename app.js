import Koa from 'koa'
import middleware from './middleware'
import './db/db'
import router from './router'
const app = new Koa()
const port = 8081
import init from './init_db'

init()

middleware(app)
router(app)
app.use(async ctx=>{
    ctx.body='hello world'
})
app.listen(port)
export default app
