var router = require('express').Router();
router.get('/', function(req, res, next) {
    res.render('geolocation/index',{});
});
module.exports = router;
// var router = require('express').Router();//创建一个router实例
// // /weipiao/main  响应
// router.get('/', function(req, res, next) {
//     res.render('geolocation/index.ejs');//显示  mai 模板
// });
// module.exports = router;
