var router = require('express').Router();//创建一个router实例
// /weipiao/main  响应
router.get('/', function(req, res, next) {
    res.render('douban/index',{});//显示  mai 模板
});
module.exports = router;
