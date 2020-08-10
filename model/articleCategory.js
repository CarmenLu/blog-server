import db from '../db/db'

let category = db.Schema({
    name:String
})
export default db.model('category',category)
