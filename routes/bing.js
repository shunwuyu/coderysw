var router = require('express').Router();//创建一个router实例
var products = require('../conf/product.js');
var AV = require('leanengine');
var url = require('url');//node.js 内置

router.get('/buy', function(req, res, next) {
    var arg = url.parse(req.url, true).query;
    var currentUser = AV.User.current();
    console.log(currentUser);

    if(!currentUser) {
        res.json({
            status:'error',
            message:'unlogin'
        });
    }

    var uid = currentUser.id;
    var query = new AV.Query(AV.User);
    query.get(uid).then(function (user) {
        var balance = user.get('balance');
        if(parseInt(balance) == 0) {
            res.json({
                status:'error',
                message:'notenough'
            });
        } else {

        }
    }, function (error) {
    // 失败了
    });


    // res.json({'a':"b"});
});

router.get('/', function(req, res, next) {

    console.log(products);
    var drink = products.drink;
    var icecream = products.icecream;
    console.log(drink);
    console.log(icecream);
    res.render('bing/index',{drink:drink, icecream:icecream});//显示  mai 模板
});

module.exports = router;
