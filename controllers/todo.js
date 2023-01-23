const Todo = require('../models/todos');
const jwt = require('jsonwebtoken');
jwtkey = "jwt"

module.exports = {

    createTodo: function (req, res) {
        const todos = new Todo({
            userId: req.params.id,
            description: req.body.description,
        });
        todos.save().then((result) => {
            // res.send(result);
            jwt.sign({ result }, jwtkey, { expiresIn: '3000s' }, (err, token) => {
                res.status(201).json({ token })
            })
        }).catch((error) => { res.send(error) })
    },

    getTodo: async function (req, res) {
        try {
            let todos = await Todo.find({ userId: req.params.id });
            if (todos == null || undefined) {
                res.send("This Todo Not a registerd")
            } else {
                let todos = await Todo.find();
                res.send(todos);
            }
        } catch {
            res.status(500).send()
        }
    },

    Todos: async function (req, res) {
        try {
            let todos = await Todo.find();
            if (todos == null || undefined) {
                res.send("This Todo Not a registerd")
            } else {
                res.send(todos);
            }
        } catch {
            res.status(500).send()
        }
    },

    updateTodo: async (req, res) => {
        const todos = await Todo.findOne({ _id: req.params.id });
        if (todos == null || undefined) {
            res.send("This Todo Not a registerd")
        } else {
            const todos = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Todo has been updated");
        }
    },

    deleteTodo: async (req, res) => {
        const todos = await Todo.findOne({ _id: req.params.id });
        if (todos == null || todos == undefined) {
            res.send("This Todo Not a registerd")
        } else {
            await Todo.findByIdAndDelete(req.params.id);
            res.status(200).json("Todo has been deleted");
        }
    }
}
