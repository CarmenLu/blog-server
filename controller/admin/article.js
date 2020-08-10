import articleModel from '../../model/article'
import path from 'path'
import marked from 'marked'
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,// 允许Git Hub标准的markdown
    tables: true, // 允许表格语法
    breaks: true,
    sanitize: true,// 对输出进行过滤(清理)，将忽略任何已经输入的html代码
    smartLists: true,
    smartypants: true,
    headerIds: true,
    pedantic: false,// 尽可能地兼容markdown.pl的晦涩部分，不纠正原始模型任何的不良行为
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

let add = async function (ctx, next) {
    console.log('添加文章')
    let paramsData = ctx.request.body
    // TODO 博客2.0 做一个全局搜索
    try {
        paramsData.html = marked(paramsData.html)
        let data = await ctx.add(articleModel, paramsData)
        ctx.send(paramsData)
    } catch (e) {
        ctx.sendError(e)
    }
}
let update = async function (ctx, next) {
    console.log('更新博客')
    let paramsData = ctx.request.body
    try {
        paramsData.html = marked(paramsData.html)
        let data = await ctx.update(articleModel, { _id: paramsData._id }, paramsData)
        ctx.send() // 更新成功
    } catch (e) {
        ctx.sendError(e)
    }
}
let dele = async function (ctx, next) {
    console.log('删除博客')
    let id = ctx.request.query.id
    try {
        ctx.remove(articleModel, { _id: id })
        ctx.send()
    } catch (e) {
        ctx.sendError(e)
    }
}

let list = async function (ctx, next) {
    console.log('获取博客列表')
    let { keyword, pageindex = 1, pagesize = 10 } = ctx.request.query;
    try {
        let reg = new RegExp(keyword, 'i')
        let data = await ctx.findPage(articleModel, {
            $or: [
                { type: { $regex: reg } },
                { title: { $regex: reg } }
            ]
        }, { createTime: 0, html: 0 }, { limit: pagesize, skip: (pageindex - 1) * pagesize })
        ctx.send(data)
    } catch (e) {
        ctx.sendError(e)

    }
}
module.exports = { add, list, dele, update }
