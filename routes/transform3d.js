var router = require('express').Router();
router.get('/', function(req, res, next) {
    res.render('transform3d/index');//显示  mai 模板
});

router.get('/point1', function(req, res, next) {
    res.render('transform3d/point1');//显示  mai 模板
});

module.exports = router;
