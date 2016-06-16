var router = require('express').Router();//创建一个router实例
// /weipiao/main  响应
router.get('/mai', function(req, res, next) {
    res.render('weipiao/mai');//显示  mai 模板
});

router.get('/cinemas', function(req, res, next) {
    res.render('weipiao/cinemas');//显示  mai 模板
});

module.exports = router;
