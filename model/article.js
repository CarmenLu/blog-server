import db from '../db/db'

let articleSchema = db.Schema({
    articleId: db.Schema.Types.ObjectId,
    type: [{
        type: Number,
        ref: 'category'
    }],
    title: String,
    html: String,
    desc: String,
    markdown: String,
    github: String,
    isVisible: Boolean,
    releaseTime: Date,
    titlePic: String,
    createTime: { type: Date, default: Date.now }
})
export default db.model('article', articleSchema)
