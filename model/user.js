import db from '../db/db'
import bcrypt from 'bcryptjs'
const saltround = 10
let userSchema = db.Schema({
    username:String,
    pwd:String,
    roles:Number,
    avatar:String,
    name:String,
    loginTime:Date
})
//每次保存时进行密码加密
//pre的第二个参数不能是箭头函数
userSchema.pre('save',function(next){
    bcrypt.genSalt(saltround,(err,salt)=>{
        if(err)return next(err)
        bcrypt.hash(this.pwd,salt,(err,hash)=>{
            if(err) return next(err)
            this.pwd=hash
            next()
        })
    })
})
// 解密 验证用户登陆的密码
userSchema.methods={
    comparePassword(userPassword,passwordHash){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(userPassword,passwordHash,(err,same)=>{
                if(err){
                    reject(err)
                }
                return resolve(same)
            })
        })

    }
}
export default db.model('user',userSchema)


