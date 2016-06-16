var router = require('express').Router();//创建一个router实例
// /weipiao/main  响应
router.get('/', function(req, res, next) {
    res.render('game/index',{});//显示  mai 模板
});

//老虎机
router.get('/tiger', function(req, res, next) {
    res.render('game/tiger',{});//显示  mai 模板
});

module.exports = router;
