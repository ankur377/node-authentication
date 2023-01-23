const express = require("express");
const router = express.Router();
const token = require('../middleware/auth');
const log = require('../helper/logger');
const { createTodo, getTodo, updateTodo, deleteTodo, Todos } = require('../controllers/todo');

router.post('/todo/:id', (req, res) => {
    try {
        log.debug("POST: /api/todo/:id");
        createTodo(req, res)
    } catch {
        log.error("POST: /api/todo/:id", error);
        res.customRes(error.message);
    }

});


router.get('/todo/:id', (req, res) => {
    getTodo(req, res)
        .then((response) => {
            log.debug("GET: /api/todo/:id");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/todo/:id", error);
            res.customRes(error.message);
        })
})

router.get('/todo', (req, res) => {
    Todos(req, res)
        .then((response) => {
            log.debug("GET: /api/todo");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/todo", error);
            res.customRes(error.message);
        })
})

router.put('/todo/:id', (req, res) => {
    try {
        log.debug("POST: /api/todo/:id");
        updateTodo(req, res)
    } catch {
        log.error("POST: /api/todo/:id", error);
        res.customRes(error.message);
    }
})


router.delete('/todo/:id', (req, res) => {
    try {
        log.debug("POST: /api/todo/:id");
        deleteTodo(req, res)
    } catch {
        log.error("POST: /api/todo/:id", error);
        res.customRes(error.message);
    }
})


module.exports = router;