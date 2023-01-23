const User = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = {

    updateHelper: async (req, res) => {
        if (req.params.id) {
            let user = await User.find({ email: req.body.email });
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail Exists'
                });
            } else {
                if (req.body.password) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(req.body.password, salt);
                    } catch (err) {
                        return res.status(500).json(err)
                    }
                }
                try {
                    const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
                    res.status(200).json("Account has been updated");
                } catch (err) {
                    return res.status(500).json(err)
                }
            }

        }
    },

    deleteHelper: async (req, res) => {
        if (req.params.id != null || req.params.id != undefined || req.params.id != "") {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted");
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            res.send("Id Is Missing For delete Data");
        }

    }

}