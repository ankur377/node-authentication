const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    post: {
        type: String,
        require: true
    },
    comments: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('posts', postSchema)
