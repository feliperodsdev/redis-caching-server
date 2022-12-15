const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title: String, 
        content: String, 
        author: String, 
        author_id: String
    }
)

modules.exports = mongoose.model('Posts', PostSchema)