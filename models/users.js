const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('users', usersSchema)