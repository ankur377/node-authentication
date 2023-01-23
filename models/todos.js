const mongoose = require('mongoose')
const todosSchema = new mongoose.Schema({

    userId: {
        type: String,
        require: true
    },
    description: {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model('todos', todosSchema)