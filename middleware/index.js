import path from 'path'
import Send from './send'
import Func from './func'
import Auth from './auth'
import Rule from './rule'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'

export default app => {

    //缓存拦截器
    app.use(async (ctx, next) => {
        if (ctx.url === '/favicon.ico') return
        await next()
        ctx.status = 200
        ctx.set('Cache-Control', 'must-revalidation')
        if (ctx.fresh) {
            ctx.status = 304
            return
        }
    })
    //请求中间件
    app.use(bodyParser())

    // 解决跨域
    app.use(cors({
        origin: function (ctx) {
            return 'http://localhost:8082'
        },
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization']

    }))

    // 数据返回中间件
    app.use(Send())
    // 方法封装
    app.use(Func())
    // 授权
    app.use(Auth())

    // 路径中间件
    Rule({
        app,
        rules: [
            {
                path: path.join(__dirname, '../controller/admin'),
                name: 'admin'
            },
            {
                path: path.join(__dirname, '../controller/client'),
                name: 'client'
            }
        ]
    })

}
