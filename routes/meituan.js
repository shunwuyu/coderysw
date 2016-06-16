var router = require('express').Router();
//通过express 创建router 路由
//    /meituan/deal/
router.get('/',function(req,res,next) {
    res.render('meituan/index',{});
});

router.get('/deal', function(req,res,next) {
    res.render('meituan/deal',{}); //渲染模版
});

module.exports = router;  // 告知外界调用
