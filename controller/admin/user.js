import jwt from 'jsonwebtoken'
import userModel from '../../model/user'
import conf from '../../config'

let login = async function (ctx, next) {
    // 登陆接口 user
    let { username, pwd } = ctx.request.body
    try {
        // 查数据库
        let data = await ctx.findOne(userModel, { username: username })
        if (!data || data.pwd !== pwd) {
            return ctx.sendError('用户名/密码错误')
        }
        /**
         * 密码加密compare
         */
        // await data.comparePassword(pwd, data.pwd).then(isMatch => {
        //     if (!isMatch) {
        //         return ctx.sendError('账号密码错误')
        //     } else {
        //
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
        await ctx.update(userModel, { _id: data._id }, { $set: { loginTime: new Date() } })
        let payload = {
            _id: data._id,
            username: data.username,
            name: data.name
        }
        /**
         * admin-token 密钥字符串
         */
        let token = jwt.sign(payload, conf.auth.admin_secret, { expiresIn: '48h' }) // token签名 有效期为24小时
        ctx.cookies.set(conf.auth.tokenKey, token, {
            httpOnly: false, // 不能通过js来获取cookie
            maxAge: conf.cookies.maxAge
        })
        let access_oss = conf.AccessInfo
        ctx.send({ message: '登陆成功', access_oss })
        console.log('登陆成功')
    } catch (e) {
        ctx.throw('登陆失败', e)
        ctx.sendError(e)
    }
}
module.exports = { login }
