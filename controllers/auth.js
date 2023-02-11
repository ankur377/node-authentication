const User = require('../models/users');
const { updateHelper, deleteHelper } = require('../helper/authHelper');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
jwtkey = "jwt"

module.exports = {

    registerUser: function (req, res) {
        User.find({ email: req.body.email })
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: 'Mail Exists'
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const user = new User({
                                name: req.body.name,
                                email: req.body.email,
                                role: req.body.role,
                                password: hash
                            });
                            user.save().then((result) => {
                                // res.send(result);
                                jwt.sign({ result }, jwtkey, { expiresIn: '3000s' }, (err, token) => {
                                    res.status(201).json({ token })
                                })
                            }).catch((error) => { res.send(error) })
                        }
                    });
                }
            })
            .catch((error) => {
                res.send(error);
            });
    },

    loginUser: async (req, res) => {

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.send("This User Is Not Found");
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send(user);
            } else {
                res.send("Your Password is Wrong");
            }
        } catch {
            res.status(500).send()
        }
    },

    getUsers: async function (req, res) {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.send("This User Is Not Found");
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                if (user.role == "admin" || "Admin") {
                    let user = await User.find();
                    res.send(user);
                } else {
                    res.send(user);
                }
            } else {
                res.send("Your Password is Wrong");
            }
        } catch {
            res.status(500).send()
        }
    },

    getUserDetail: async function (req, res) {
        try {
            let user = await User.find();
            res.send(user);
        } catch {
            res.status(500).send()
        }

    },

    updateUser: async (req, res) => {
        const Users = await User.findOne({ _id: req.params.id });
        if (Users == null || undefined) {
            res.send("This User Not a registerd")
        } else {
            if (Users.role == "User") {
                updateHelper(req, res);
            } else {
                updateHelper(req, res);
            }
        }
    },

    deleteUser: async (req, res) => {
        const Users = await User.findOne({ _id: req.params.id });
        console.log(Users);
        if (Users == null || Users == undefined) {
            res.send("This User Not a registerd")
        } else {
            if (req.params.id && Users.role == "User") {
                deleteHelper(req, res);
            } else {
                deleteHelper(req, res);
            }
        }
    }
}
