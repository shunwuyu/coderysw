var router = require('express').Router();
router.get('/', function(req, res, next) {
    res.render('guanjia/index',{});
});

module.exports = router;
