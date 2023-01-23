// import packages
let router = require('express').Router();

router.use('/auth',require('./auth'));

router.use('/',require('./todo'));

router.use('/',require('./posts'));

module.exports = router;