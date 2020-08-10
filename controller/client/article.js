import blogModel from '../../model/article'

let list = async function (ctx, next) {
    let { type = null, pageindex = 1, pagesize = 10 } = ctx.request.query
    try {
        let data = await ctx.find(blogModel, { type, isVisible: true }, null, {
            limit: pagesize * 1,
            skip: (pageindex - 1) * pagesize,
            sort: { creatTime: -1 }
        })
        ctx.send(data)
    } catch (e) {
        ctx.sendError(e)
    }
}
let info = async function (ctx, next) {
    // 获取博客信息
    let _id = ctx.request.query._id
    try {
        let data = ctx.findOne(blogModel, { _id })
        return ctx.send(data)
    } catch (e) {
        ctx.sendError(e)
    }
}
module.exports = { list, info }
