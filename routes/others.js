var router = require('express').Router();
router.get('/xw', function(req,res,next) {
    res.render('others/xw',{});
});
module.exports = router;
