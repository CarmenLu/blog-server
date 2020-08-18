import path from 'path'

const region = "oss-cn-beijing"
const bucket = "blog-pic-carmen"
const accessKeyId = 'LTAI4G2cZYii21ed4m2BUEtw'
const accessKeySecret = 'rgObU0DzA8ueP9XuWtyWLz1CoWSyKp'
const endpoint = 'oss-cn-beijing.aliyuncs.com'
const AccessInfo = {
    region,
    bucket,
    accessKeyId,
    accessKeySecret,
    endpoint
}
const ARN = 'acs:ram::1945681702633330:role/carmen-blog'
const policy = '{\n' +
    '  "Version": "1",\n' +
    '  "Statement": [\n' +
    '    {\n' +
    '      "Effect": "Allow",\n' +
    '      "Action": [\n' +
    '        "oss:*"\n' +
    '      ],\n' +
    '      "Resource": [\n' +
    '        "acs:oss:*:*:blog-pic-carmen"\n' +
    '      ],\n' +
    '      "Condition": {}\n' +
    '    }\n' +
    '  ]\n' +
    '}'
const STSEndpoint = 'https://sts.cn-shenzhen.aliyuncs.com'
const STSInfo = {
    ARN,
    policy,
    STSEndpoint
}

const auth = {
    admin_secret: 'admin-token',
    tokenKey: 'Token-Auth',
    whiteList: ['login', 'client'],
    blackList: ['admin']
}
const cookies = {
    maxAge: 259200000
}
module.exports = { auth, cookies, AccessInfo, STSInfo }
