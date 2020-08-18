import { AccessInfo, STSInfo } from '../../config'
import STS from '@alicloud/pop-core'

export default () => {
    let Tok = new STS({
        endpoint: STSInfo.STSEndpoint,
        accessKeyId: AccessInfo.accessKeyId,
        accessKeySecret: AccessInfo.accessKeySecret,
        DurationSeconds: 3600,
        apiVersion: '2015-04-01'
    })
    let params = {
        'RoleArn': STSInfo.ARN,
        'RoleSessionName': 'Carmen',
        'Policy': STSInfo.policy
    }
    let getSTStoken = () => {
        return Tok.request('AssumeRole', params)
    }
    // return new Promise((resolve, reject) => {
    //     let res=Tok.request('AssumeRole', params)
    //     if(res){
    //         resolve(res)
    //     }else{
    //         reject(res)
    //     }
    // })
    return async (ctx, next) => {
        ctx.getSTStoken = getSTStoken()
        await next()
    }
}

