import koaRouter from '@koa/router'

const router = koaRouter()

export default app => {
    /*
    admin-文章请求
     */
    router.get('/admin/blog/list', app.admin.article.list)
    router.post('/admin/blog/post', app.admin.article.add)
    router.post('/admin/blog/update', app.admin.article.update)
    router.post('/admin/blog/del', app.admin.article.dele)
    /*
    admin
     */
    router.post('/user/login', app.admin.user.login) //登陆
    /*
    OSS-STS请求
     */
    router.post('/sts-tk', app.admin.pic.stsToken)
    /*
    client
     */
    router.get('/client/blog/list', app.client.article.list)
    router.get('/client/blog/info', app.client.article.info)

    app.use(router.routes()).use(router.allowedMethods()) //根据ctx.status设置响应头

}
