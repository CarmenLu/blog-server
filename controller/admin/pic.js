let stsToken = async function (ctx, next) {
    try {
        let data = await ctx.getSTStoken
        ctx.send({ message: '成功' }, data)
    } catch (e) {
        ctx.sendError(e)
    }

}
module.exports = { stsToken }
