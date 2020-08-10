import path from 'path'

const auth = {
    admin_secret: 'admin-token',
    tokenKey: 'Token-Auth',
    whiteList: ['login', 'client'],
    blackList: ['admin']
}
const cookies = {
    maxAge: 259200000
}
module.exports = { auth, cookies }
