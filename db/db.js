import mongoose from 'mongoose'

let setting = require('./setting')
let db_url = setting.db_url; //连接url
mongoose.connect(db_url, { useMongoClient: true }); //连接成功
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to' + db_url);
})
mongoose.connection.on('error', function (err) {
    console.log(err);
})
mongoose.connection.on('disconnected', function () {
    console.log('disconnected')
})
export default mongoose
