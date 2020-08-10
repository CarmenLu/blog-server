/**
 *
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件,如顺序查找，某些字段不查找
 * @param options
 * @returns {*}
 */
let findOne = function (model, conditions, fields, options = {}) {
    let sort = options.sort === undefined ? { _id: -1 } : options.sort
    delete options.sort
    return new Promise((resolve, reject) => {
        model.findOne(conditions, fields, options, function (err, res) {
            if (err) {
                console.log('Error' + JSON.stringify(err))
                reject(err)
                return false
            } else {
                if (res) {
                    console.log('find!')
                } else {
                    console.log('无该数据')
                }
                resolve(res)
            }
        })
    })

}
/**
 *
 * @param model
 * @param conditions
 */
let add = (model, conditions) => {
    return new Promise((resolve, reject) => {
        model.create(conditions, (res, err) => {
            if (err) {
                console.log('添加失败', err)
                reject(err)
                return false
            } else {
                resolve(res)
            }
        })
    })
}
/**
 *
 * @param model 模型
 * @param conditions 增加的条件
 * @param update 更新条件
 * @param options
 */
let update = (model, conditions, update, options) => {
    return new Promise((resolve, reject) => {
        model.update(conditions, update, options, (err, res) => {
            if (err) {
                console.log('更新失败' + err)
                reject(err)
                return false
            }
            if (res.n !== 0) {
                console.log('更新成功')
            } else {
                console.log('更新失败')
            }
            resolve(res)
        })
    })
}
/**
 *
 * @param model
 * @param conditions
 * @returns {Promise<any>}
 */
let remove = (model, conditions) => {
    return new Promise((resolve, reject) => {
        model.remove(conditions, (err, res) => {
            if (err) {
                console.log('Error' + JSON.stringify(err))
                reject(err)
                return false
            } else {
                if (res.result.n !== 0) {
                    console.log('删除成功')
                } else {
                    console.log('没有找到数据')
                }
                resolve(res)
            }
        })
    })
}
/**
 *
 * @param model
 * @param conditions
 * @param fields
 * @param options
 * @returns {Promise<any>}
 */
let find = (model, conditions, fields, options = {}) => {
    let sort = options.sort === undefined ? { _id: -1 } : options.sort
    delete options.sort
    return new Promise((resolve, reject) => {
        model.find(conditions, fields, options, function (err, res) {
            if (err) {
                console.log('Error' + JSON.stringify(err))
                reject(err)
                return false
            } else {
                if (res.length !== 0) {
                    console.log('查找成功')
                } else {
                    console.log('查找失败')
                }
            }
        })
    })
}
/**
 *
 * @param model
 * @param conditions
 * @param fields
 * @param options
 * @returns {Promise<any>}
 */
let findPage = async (model, conditions, fields, options = {}) => {
    let sort = options.sort === undefined ? { _id: -1 } : options.sort
    delete options.sort

    let getCount = () => {
        return new Promise((resolve, reject) => {
            model.find(conditions, fields).count({}, (res, err) => {
                if (err) {
                    console.log('查询长度错误')
                    return reject(err)
                }
                resolve(res)
            })
        })
    }
    let count = await getCount()
    return new Promise((resolve, reject) => {
        model.find(conditions,fields, options, (err, res) => {
            if (err) {
                console.log('Error' + JSON.stringify(err))
                reject(err)
                return false
            } else {
                if (res.length !== 0) {
                    console.log('查找成功')
                    resolve({
                        list: res,
                        total: count
                    })
                } else {
                    console.log('没有该数据')
                    resolve({
                        list: res,
                        total: count
                    })
                }
            }
        })
    })

}
module.exports={ findOne, find, update, add, remove, findPage }
