const express = require("express");
const router = express.Router();
const log = require('../helper/logger');
const { createPost, getPost, updatePost, deletePost,Posts,createComment } = require('../controllers/posts');

router.post('/post/:id', (req, res) => {
    console.log("req",req.file);
    try {
        log.debug("POST: /api/post/:id");
        createPost(req, res)
    } catch {
        log.error("POST: /api/post/:id", error);
        res.customRes(error.message);
    }

});


router.get('/post/:id', (req, res) => {
    getPost(req, res)
        .then((response) => {
            log.debug("GET: /api/post/:id");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/post/:id", error);
            res.customRes(error.message);
        })
})

router.get('/posts', (req, res) => {
    Posts(req, res)
        .then((response) => {
            log.debug("GET: /api/posts");
            res.send(response);
        }).catch((error) => {
            log.error("GET: /api/posts", error);
            res.customRes(error.message);
        })
})

router.put('/post/:id', (req, res) => {
    try {
        console.log(req.params.id);
        log.debug("POST: /api/post/:id");
        updatePost(req, res)
    } catch {
        log.error("POST: /api/post/:id", error);
        res.customRes(error.message);
    }
})


router.delete('/post/:id', (req, res) => {
    try {
        log.debug("POST: /api/post/:id");
        deletePost(req, res)
    } catch {
        log.error("POST: /api/post/:id", error);
        res.customRes(error.message);
    }
})

router.post('/comment/:id', (req, res) => {
    try {
        log.debug("POST: /api/comment/:id");
        createComment(req, res)
    } catch {
        log.error("POST: /api/comment/:id", error);
        res.customRes(error.message);
    }

});


module.exports = router;