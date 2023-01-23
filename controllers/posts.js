const Post = require('../models/posts');

module.exports = {
    createPost: async (req, res) => {
        const newPost = new Post({
            userId: req.params.id,
            post: req.body.post,
        });
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updatePost: async (req, res) => {
        try {
            const posts = await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.send(posts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deletePost: async (req, res) => {
        const posts = await Post.findOne({ _id: req.params.id });
        if (posts == null || posts == undefined) {
            res.send("This Post Not a registerd")
        } else {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Post has been deleted");
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    Posts: async (req, res) => {
        try {
            const post = await Post.find();
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createComment: async (req, res) => {
        try {
            const result = await Post.findByIdAndUpdate(req.params.id, { $push: { comments: req.body } });
            res.status(200).json("Succesfully Add Comment");
        } catch (error) {
            res.status(500).json(error);
        }
    },
}