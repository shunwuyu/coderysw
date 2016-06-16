var router = require('express').Router();

router.get('/list', function(req, res, next) {
    res.render('member/list',{});
});

router.get('/detail/:telephone', function(req, res, next) {
    console.log(req.params.telephone);
    res.render('member/detail',{});
});
module.exports = router;
