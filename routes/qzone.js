var router = require('express').Router();
router.get('/shuoshuo/', function(req, res,next) {
    res.render('qzone/shuoshuo',{});
});

router.get('seattle', function(req, res, next) {
    res.render('qzone/seattle');
});

router.get('/zk/:page', function(req, res,next) {
    var page = req.params.page,
        items = [];
    if(page == 1) {
        items = [
            {},
            {},
            {}
        ];
    } else if(page == 2) {

    } else if(page == 3) {

    }
    res.json({status:'ok',items:items});
});

module.exports = router;
